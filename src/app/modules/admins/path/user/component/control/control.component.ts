import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class UserControlComponent {
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

  parseEmployee(user) {

    user.Employee = {
      Id : user.EmployeeId,
      Name : user.EmployeeName
    };

    return user;
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.userService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '绑定用户列表失败, ' + err
            });
          });
      } else {
        this.userService
          .detail(this.userId, data => {
            data = this.parseEmployee(data);
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '绑定用户列表失败, ' + err
            });
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

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.userService.create(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.open({
              type: 'danger',
              content: '绑定用户列表失败, ' + err
            });
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
      this.userService.update(value, data => {
        if (data.IsValid) {
          this.userService.list((err) => {
            this.alertService.open({
              type: 'danger',
              content: '绑定用户列表失败, ' + err
            });
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


