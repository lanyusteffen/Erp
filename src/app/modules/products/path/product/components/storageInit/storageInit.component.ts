import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { AlertService, ModuleName} from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-product-storage-init',
  templateUrl: './storageInit.component.html',
  styleUrls: ['./storageInit.component.less'],
  providers: [FormService]
})

export class ProductStorageInitComponent {
  private products = <any>[];
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private form: any;
  private _show: boolean;
  private _productId: number;
  private _storageInitList: Array<any>;
  private _storageInit: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private formService: FormService
  ) {
  }

  @LocalStorage()
  systemConfig: any;

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  get formReady(): boolean {
    if (this.form) {
      return !!(this.form.value as FormArray).length;
    }
    return false;
  }

  get storageInitList(): FormArray {
    return this.form.value as FormArray;
  }

  handleClose() {
    this.onClose.emit();
  }

  @Input()
  set productId(productId) {
    if (productId) {
      this._productId = productId;
      if (this.show) {
        this.productService.getStorageDetailList(productId, data => {
          this.form = this.formService.createArrayForm(data);
        }, (err) => {
          this.alertService.listErrorCallBack(ModuleName.StorageInit, err);
        });
      }
    }
  }

  @Input()
  set localSystemConfig(systemConfig) {
    this.systemConfig = systemConfig;
  }

  get productId() {
    return this._productId;
  }

  getKeys(item) {
    return Object.keys(item);
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定期初信息列表失败!' + err
    });
  }

  onSubmit({ value }, isValid) {

    const storageInitList = new Array();

    value.forEach((val, idx, array) => {
      // val: 当前值
      // idx：当前index
      // array: Array
      if (val.StorageId === 0 && (val.BeginCount > 0 || val.UnitCost > 0
        || val.InitialTotalAmount > 0 || val.StorageLowerAlarmCount > 0 || val.StorageUpAlarmCount > 0)) {
         storageInitList.push(val);
       } else if (val.StorageId > 0) {
         storageInitList.push(val);
       }
    });

    this.productService.createOrUpdate(storageInitList, data => {
      if (data.IsValid) {
        this.productService.getStorageDetailList(this._productId, inData => {
          this.form = this.formService.createArrayForm(inData);
        }, (err) => {
          this.alertService.listErrorCallBack(ModuleName.StorageInit, err);
        });
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageInit, err);
    });
  }
}
