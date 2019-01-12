import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { AlertService } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-product-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.less'],
  providers: [FormService]
})

export class UnitComponent {
  private products = <any>[];
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private form = new FormGroup({});
  private _show: boolean;
  private _productId: number;
  private _productUnitList: Array<any>;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private formService: FormService,
    private loadingBar: SlimLoadingBarService
  ) {
  }

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定商品单位列表失败!' + err
    });
  }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  get productUnitList(): Array<any> { return this._productUnitList; }

  handleClose() {
    this.onClose.emit();
  }

  @Input()
  set productId(productId) {
    this._productId = productId;
    if (this.show) {
      this.loadingBar.complete();
      this.productService.getProductUnitList(productId, data => {
        this._productUnitList = data;
        this.form = this.formService.createForm(data);
        this.loadingBar.complete();
      }, (err) => {
        this.listErrorCallBack(err);
        this.loadingBar.complete();
      });
    }
  }

  get productId() {
    return this._productId;
  }

  getKeys(item) {
    return Object.keys(item);
  }
}
