import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductUnitService } from '../../productunit.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productunit-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class ProductUnitControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _productUnitId: number;
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
  set productUnitId(productUnitId) {
    this._productUnitId = productUnitId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增商品单位' : '修改商品单位';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.productUnitService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
          });
      } else {
        this.productUnitService
          .detail(this._productUnitId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
          });
      }
    }
  }

  get productUnitId() {
    return this._productUnitId;
  }

  constructor(
    private productUnitService: ProductUnitService,
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
      this.productUnitService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.productUnitService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.productUnitService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
