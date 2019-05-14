import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OtherIncomeService } from '../../otherincome.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-otherincome-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class OtherIncomeControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _otherIncomeId: number;
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
  set otherIncomeId(otherIncomeId) {
    this._otherIncomeId = otherIncomeId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增其他收入' : '修改其他收入';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.otherIncomeService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
          });
      } else {
        this.otherIncomeService
          .detail(this._otherIncomeId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
          });
      }
    }
  }

  get otherIncomeId() {
    return this._otherIncomeId;
  }

  constructor(
    private otherIncomeService: OtherIncomeService,
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
      this.otherIncomeService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
      });
    }
  }

  onSubmit({ value }, isValid) {
    if (!isValid) {
      return;
    }
    if (value.Id === 0) {
      this.otherIncomeService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.otherIncomeService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
