import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PermissionService } from '../../permission.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { ErrorService } from '@services/error.service';

@Component({
  selector: 'app-permission-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class PermissionControlComponent {

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
  @Input() type = 'create';

  private _companyId: number;

  get permissionId() {
    return this._companyId;
  }

  @Input()
  set permissionId(companyId) {
    this._companyId = companyId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加权限';
    } else {
      return '修改权限';
    }
  }

  private getKeycodeValidators() {
    return [
      Validators.required,
      Validators.maxLength(20)
    ];
  }

  private getInitValidators() {
    const validatorArrs = {
      Name: [
        Validators.required
      ]
    };
    return validatorArrs;
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.permissionService
          .newOne(data => {
            this.form = this.formService.createForm(data, this.getInitValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          });
      } else {
        this.permissionService
          .detail(this.permissionId, data => {
            this.form = this.formService.createForm(data, this.getInitValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          });
      }
    }
  }

  getErrorMessage(key: string, controlErrors: ValidationErrors) {
    switch (key) {
      case 'Keycode':
        return '权限关键字必填!';
      case 'Name':
        return '权限名称必填';
    }
    return controlErrors.errMsg;
  }

  constructor(
    private permissionService: PermissionService,
    private errorService: ErrorService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  selectButtonStyleChanged(value) {
    if (value === 99) {
      this.form.controls['Keycode'].setValidators(this.getKeycodeValidators());
      this.form.controls['Keycode'].updateValueAndValidity({emitEvent: false, onlySelf: true});
    } else {
      this.form.controls['Keycode'].clearValidators();
      this.form.controls['Keycode'].updateValueAndValidity({emitEvent: false, onlySelf: true});
    }
  }

  onSubmit({ value }, isValid) {
    if (!isValid) {
      this.errorService.renderErrorItems(this.form,
        (key, controlErrors) => this.getErrorMessage(key, controlErrors));
      return;
    }
    if (this.type === 'create') {
      this.permissionService.create(value, data => {
        if (data.IsValid) {
          this.permissionService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          }, () => {
            this.refreshList();
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
      this.permissionService.update(value, data => {
        if (data.IsValid) {
          this.permissionService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          }, () => {
            this.refreshList();
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
