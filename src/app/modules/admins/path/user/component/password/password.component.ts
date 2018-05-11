import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less'],
  providers: [FormService]
})

export class UserPasswordComponent {
  private form = new FormGroup({});
  private _show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }

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
    return '修改用户';
  }

  parseEmployee(user) {

    user.Employee = {
      Id: user.EmployeeId,
      Name: user.EmployeeName
    };

    return user;
  }

  refreshList() {
    if (this._show) {
      this.userService
        .detail(this.userId, data => {
          data = this.parseEmployee(data);
          this.form = this.formService.createForm(data);
        }, (err) => {
         this.alertService.listErrorCallBack(ModuleName.User, err);
        });
    }
  }

  constructor(
    private userService: UserService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }


  onSubmit({ value }) {

    this.userService.changePassword(value, data => {
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


