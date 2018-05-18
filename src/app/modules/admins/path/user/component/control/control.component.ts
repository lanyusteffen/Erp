import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class UserControlComponent {
  private controlForm = new FormGroup({});
  private _show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }
  @Input() type = 'create';

  private _userId: number;

  get userId() {
    return this._userId;
  }

  @Input()
  set userId(userId) {
    this._userId = userId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加用户';
    } else {
      return '修改用户';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.userService
          .newOne(data => {
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          });
      } else {
        this.userService
          .detail(this.userId, data => {
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          });
      }
    }
  }

  constructor(
    private userService: UserService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.controlForm.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.userService.create(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          }, () => {
            this.onClose.emit();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.userService.update(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          }, () => {
            this.onClose.emit();
            this.alertService.modifySuccess();
          });
        } else {
          this.alertService.modifyFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}


