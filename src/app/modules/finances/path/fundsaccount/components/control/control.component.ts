import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FundsAccountService } from '../../fundsaccount.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-fundsaccount-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class FundsAccountControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _fundsAccountId: number;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';

  @Input()
  set fundsAccountId(fundsAccountId) {
    this._fundsAccountId = fundsAccountId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增资金账户' : '修改资金账户';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.fundsAccountService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
          });
      } else {
        this.fundsAccountService
          .detail(this._fundsAccountId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
          });
      }
    }
  }

  get fundsAccountId() {
    return this._fundsAccountId;
  }

  constructor(
    private fundsAccountService: FundsAccountService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  validate(data, option: string): void {
    if (data.IsValid) {
      this.onClose.emit();
      this.alertService.open({
        type: 'success',
        content: option + '成功！'
      });
      this.fundsAccountService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.fundsAccountService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.fundsAccountService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
