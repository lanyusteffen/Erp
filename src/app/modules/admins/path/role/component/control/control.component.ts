import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../role.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-role-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class RoleControlComponent {
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

  private _roleId: number;

  get roleId() {
    return this._roleId;
  }

  @Input()
  set roleId(roleId) {
    this._roleId = roleId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加角色';
    } else {
      return '修改角色';
    }
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定角色列表失败!' + err
    });
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.roleService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      } else {
        this.roleService
          .detail(this.roleId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      }
    }
  }

  constructor(
    private roleService: RoleService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.roleService.create(value, data => {
        if (data.IsValid) {
          this.roleService.list((err) => {
            this.listErrorCallBack(err);
          }, () => {
            this.onClose.emit();
            this.alertService.open({
              type: 'success',
              content: '添加成功！'
            });
          });
        } else {
          this.alertService.open({
            type: 'danger',
            content: '添加失败, ' + data.ErrorMessages
          });
        }
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '添加失败, ' + err
        });
      });
    } else {
      this.roleService.update(value, data => {
        if (data.IsValid) {
          this.roleService.list((err) => {
           this.listErrorCallBack(err);
          }, () => {
            this.onClose.emit();
            this.alertService.open({
              type: 'success',
              content: '修改成功！'
            });
          });
        } else {
          this.alertService.open({
            type: 'danger',
            content: '修改失败, ' + data.ErrorMessages
          });
        }
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '修改失败, ' + err
        });
      });
    }
  }
}


