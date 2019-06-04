import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../role.service';
import { FormService } from '@services/form.service';
import { FormGroup } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-role-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [
    FormService
  ]
})

export class RoleControlComponent {

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

  private _roleId: number;

  get roleId() {
    return this._roleId;
  }

  @Input()
  set roleId(roleId) {
    this._roleId = roleId;
    this.loadingBar.start();
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加角色';
    } else {
      return '修改角色';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.roleService
          .newOne(data => {
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.listErrorCallBack(ModuleName.Role, err);
          });
      } else {
        this.roleService
          .detail(this.roleId, data => {
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.listErrorCallBack(ModuleName.Role, err);
          });
      }
    }
  }

  constructor(
    private roleService: RoleService,
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
    if (!isValid) {
      return;
    }
    this.loadingBar.start();
    if (this.type === 'create') {
      this.roleService.create(value, data => {
        if (data.IsValid) {
          this.roleService.list((err) => {
            this.loadingBar.complete();
            this.alertService.listErrorCallBack(ModuleName.Role, err);
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
      this.roleService.update(value, data => {
        if (data.IsValid) {
          this.roleService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Role, err);
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
