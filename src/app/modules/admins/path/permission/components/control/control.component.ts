import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PermissionService } from '../../permission.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

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

  private getValidators() {
    const validatorArrs = {
      Keycode: [
        Validators.required,
        Validators.maxLength(20)
      ],
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
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          });
      } else {
        this.permissionService
          .detail(this.permissionId, data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Company, err);
          });
      }
    }
  }

  constructor(
    private permissionService: PermissionService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }, isValid) {
    if (!isValid) {
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
