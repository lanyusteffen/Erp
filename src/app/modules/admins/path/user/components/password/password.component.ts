import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { CustomValidators } from 'ng2-validation';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-user-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})

export class UserPasswordComponent implements OnInit {

  @ViewChild('ConfirmPassword')
  private childFieldConfirmPassword: FormFieldComponent;

  @ViewChild('Password')
  private childFieldPassword: FormFieldComponent;

  @ViewChild('CurrentPassword')
  private childFieldCurrentPassword: FormFieldComponent;

  private passwordForm: FormGroup;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  private _show = false;
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
  }

  getTitle(): string {
    return '修改用户';
  }

  checkPasswordConsistent() {
    if (this.passwordForm.controls.ConfirmPassword.errors !== null &&
          this.passwordForm.controls.ConfirmPassword.errors.equalTo) {
      this.childFieldConfirmPassword.validError = '密码输入不一致!';
    }
  }

  checkOldPassword(evt) {
    if (this.passwordForm.controls.CurrentPassword.errors !== null &&
      this.passwordForm.controls.CurrentPassword.errors.rangeLength) {
      this.childFieldCurrentPassword.validError = '密码需要至少6-20位字符或数字!';
    }
  }

  checkNewPassword() {
    if (this.passwordForm.controls.Password.errors !== null &&
      this.passwordForm.controls.Password.errors.rangeLength) {
      this.childFieldPassword.validError = '密码需要至少6-20位字符或数字!';
    }
  }

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
  }

  ngOnInit() {
    const password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 20])]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    this.passwordForm = new FormGroup({
      Password: password,
      CurrentPassword: new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 20])]),
      ConfirmPassword: confirmPassword
    });
  }

  get formReady(): boolean { return !!Object.keys(this.passwordForm.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }, isValid) {
    if (!isValid) {
      return;
    }

    value.Id = this._userId;

    this.userService.changePassword(value, data => {
      this.loadingBar.start();
      if (data.IsValid) {
        this.userService.list((err) => {
          this.loadingBar.complete();
          this.alertService.listErrorCallBack(ModuleName.User, err);
        }, () => {
          this.onClose.emit();
          this.loadingBar.complete();
          this.alertService.modifySuccess();
        });
      }
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.modifyFail(err);
    });
  }
}


