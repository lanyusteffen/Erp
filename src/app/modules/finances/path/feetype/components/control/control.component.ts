import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeeTypeService } from '../../feeType.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-feetype-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class FeeTypeControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _feeTypeId: number;
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
  set feeTypeId(feeTypeId) {
    this._feeTypeId = feeTypeId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增费用类型' : '修改费用类型';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.feeTypeService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.FeeType, err);
          });
      } else {
        this.feeTypeService
          .detail(this._feeTypeId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.FeeType, err);
          });
      }
    }
  }

  get feeTypeId() {
    return this._feeTypeId;
  }

  constructor(
    private feeTypeService: FeeTypeService,
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
      this.feeTypeService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.FeeType, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.feeTypeService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.feeTypeService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
