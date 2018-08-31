import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-product-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class ProductControlComponent {
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

  private _productId: number;

  get productId() {
    return this._productId;
  }

  @Input()
  set productId(productId) {
    this._productId = productId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加产品';
    } else {
      return '修改产品';
    }
  }

  select(evt, selectedItem) {
  }


  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定产品列表失败!' + err
    });
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.productService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      } else {
        this.productService
          .detail(this.productId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.listErrorCallBack(err);
          });
      }
    }
  }

  constructor(
    private productService: ProductService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }
  get productColorList(): FormArray { return this.form.get('ProductColorActionRequests') as FormArray; }
  get productSizeList(): FormArray { return this.form.get('ProductSizeActionRequests') as FormArray; }  
  get productUnitList(): FormArray { return this.form.get('ProductUnitList') as FormArray; }


  handleClose() {
    this.onClose.emit();
    this._productId = 0;
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.productService.create(value, data => {
        if (data.IsValid) {
          this.productService.list((err) => {
            this.listErrorCallBack(err);
          }, () => {
            this.onClose.emit();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.productService.modify(value, data => {
        if (data.IsValid) {
          this.productService.list((err) => {
            this.listErrorCallBack(err);
          }, () => {
            this.onClose.emit();
            this.alertService.modifySuccess();
          });
        } else {
          this.alertService.modifyFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}


