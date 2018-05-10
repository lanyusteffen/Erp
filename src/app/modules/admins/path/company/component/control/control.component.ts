import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../../company.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-company-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class CompanyControlComponent {
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

  get companyId() {
    return this._companyId;
  }

  @Input()
  set companyId(companyId) {
    this._companyId = companyId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加公司';
    } else {
      return '修改公司';
    }
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定公司列表失败!' + err
    });
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.companyService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      } else {
        this.companyService
          .detail(this.companyId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      }
    }
  }

  constructor(
    private companyService: CompanyService,
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
      this.companyService.create(value, data => {
        if (data.IsValid) {
          this.companyService.list((err) => {
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
      this.companyService.update(value, data => {
        if (data.IsValid) {
          this.companyService.list((err) => {
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


