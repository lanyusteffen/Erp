import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-product-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.less'],
  providers: [FormService]
})

export class ProductExtensionComponent {
  private products = <any>[];
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private form = new FormGroup({});
  private _show: boolean;
  private _productId: number;
  private _productExtendItemList: Array<any>;


  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private formService: FormService
  ) {
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定扩展信息失败!' + err
    });
  }


  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  get productExtendItemList(): Array<any> { return this._productExtendItemList; }

  get propertyName1(): string { return this.form.get('PropertyName1').value; }

  get propertyName2(): string { return this.form.get('PropertyName2').value; }


  handleClose() {
    this.onClose.emit();
  }

  @Input()
  set productId(productId) {
    this._productId = productId;
    if (this.show) {
      this.productService.productExtensions(productId, data => {
        const extensions = {
          PropertyName1: data.PropertyName1,
          PropertyName2: data.PropertyName2
        };

        this._productExtendItemList = data.ProductExtendItemList;

        this.form = this.formService.createForm(extensions);
      }, (err) => {
        this.listErrorCallBack(err);
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
