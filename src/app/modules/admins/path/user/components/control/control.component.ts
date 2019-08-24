import { Component, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { FormService } from '@services/form.service';
import { FormGroup } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { EmployeeSelectorComponent } from '../../../../../basics/components/employee-selector/employee-selector.component';

@Component({
  selector: 'app-user-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [
    FormService
  ]
})

export class UserControlComponent {

  @ViewChild(EmployeeSelectorComponent)
  private employeeSelector: EmployeeSelectorComponent;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  private form = new FormGroup({});
  private _show = false;

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
    this.loadingBar.start();
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
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.listErrorCallBack(ModuleName.User, err);
          });
      } else {
        this.userService
          .detail(this.userId, data => {
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.listErrorCallBack(ModuleName.User, err);
          });
      }
    }
  }

  constructor(
    private userService: UserService,
    private formService: FormService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
  }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }, isValid) {

    value.EmployeeName = this.employeeSelector.selectedTab ;

    if (!isValid) {
      return;
    }
    this.loadingBar.start();
    if (this.type === 'create') {
      this.userService.create(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          }, () => {
            this.refreshList();
            this.onClose.emit();
            this.loadingBar.complete();
            this.alertService.addSuccess();
          });
        } else {
          this.loadingBar.complete();
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.loadingBar.complete();
        this.alertService.addFail(err);
      });
    } else {
      this.userService.update(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.User, err);
          }, () => {
            this.refreshList();
            this.onClose.emit();
            this.loadingBar.complete();
            this.alertService.modifySuccess();
          });
        } else {
          this.loadingBar.complete();
          this.alertService.modifyFail(data.ErrorMessages);
        }
      }, (err) => {
        this.loadingBar.complete();
        this.alertService.modifyFail(err);
      });
    }
  }
}
