import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ErrorService } from '@services/error.service';

@Component({
  selector: 'app-product-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class ProductControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _productColors = new Array();
  private _productSizes = new Array();
  private errorItems = new Array();
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
    if (this._productId > 0) {
      this.selectColor(null, null);
      this.selectSize(null, null);
    }
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加产品';
    } else {
      return '修改产品';
    }
  }

  select(evt, selectedItem) {
    this.createGoods(evt, selectedItem);
  }

  createGoods(evt, selectedItem): void {
    this.selectColor(evt, selectedItem);
    this.selectSize(evt, selectedItem);

    const goodsList = <FormArray>this.form.controls['GoodsActionRequests'];
    const length = goodsList.length;
    for (let i = 0; i < length; i++) {
      goodsList.removeAt(0);
    }

    if (this._productColors.length > 0 && this._productSizes.length > 0) {
      let index = 0;
      this._productColors.map(color => {
        this._productSizes.map(size => {
          const goods = {
            Index: index++,
            ProductColorId: color.Id,
            ProductColorValue: color.Name,
            ProductSizeId: size.Id,
            ProductSizeValue: size.Name
          };
          goodsList.insert(goodsList.length, this.fb.group(goods));
        });
      });

    } else if (this._productColors.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      let index = 0;
      this._productColors.map(color => {
        const goods = {
          Index: index++,
          ProductColorId: color.Id,
          ProductColorValue: color.Name
        };
        goodsList.insert(goodsList.length, this.fb.group(goods));

      });

    } else if (this._productSizes.length > 0) {
      let index = 0;
      this._productSizes.map(size => {
        const goods = {
          Index: index++,
          ProductSizeId: size.Id,
          ProductSizeValue: size.Name
        };
        goodsList.insert(goodsList.length, this.fb.group(goods));
      });
    }
  }

  selectColor(evt, selectedItem): void {
    const productColorList = this.form.get('ProductColorActionRequests').value;
    if (evt == null) {
      productColorList.map(item => {
        if (item.IsSelected && !this.isContainer(this._productColors, item)) {
          this._productColors.push(item);
        }
      });
    } else {
      productColorList.map(item => {
        if (item.Name === selectedItem.Name) {
          item.IsSelected = evt.target.checked;
          if (evt.target.checked && !this.isContainer(this._productColors, item)) {
            this._productColors.push(item);
          } else {
            for (let i = 0; i < this._productColors.length; i++) {
              if (this._productColors[i].Name === selectedItem.Name) {
                this._productColors.splice(i, 1);
              }
            }
          }
        }
      });
    }
  }

  selectSize(evt, selectedItem): void {
    const productSizeList = this.form.get('ProductSizeActionRequests').value;
    if (evt == null) {
      productSizeList.map(item => {
        if (item.IsSelected && !this.isContainer(this._productSizes, item)) {
          this._productSizes.push(item);
        }
      });
    } else {
      productSizeList.map(item => {
        if (item.Name === selectedItem.Name) {
          item.IsSelected = evt.target.checked;
          if (evt.target.checked && !this.isContainer(this._productSizes, item)) {
            this._productSizes.push(item);
          } else {
            for (let i = 0; i < this._productSizes.length; i++) {
              if (this._productSizes[i].Name === selectedItem.Name) {
                this._productSizes.splice(i, 1);
              }
            }
          }
        }
      });
    }
  }

  isContainer(arr: any, item: any): boolean {

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].Id === item.Id) {
        return true;
      }
    }
    return false;

  }

  onRemove(index: number): void {
    const goodsList = <FormArray>this.form.controls['GoodsActionRequests'];

    const _goodsList = new Array();

    // tslint:disable-next-line:no-shadowed-variable
    for (let i = 0; i < goodsList.length; i++) {
      _goodsList.push(goodsList.controls[i]);
    }
    _goodsList.splice(index, 1);

    const length = goodsList.length;
    for (let i = 0; i < length; i++) {
      goodsList.removeAt(0);
    }

    for (let j = 0; j < _goodsList.length; j++) {
      _goodsList[j].value.Index = j;
      goodsList.insert(j, _goodsList[j]);
    }

  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定产品列表失败!' + err
    });
  }

  public setErrorMessage(propertyName, displayName, errors): void {

    this.errorService.removeErrorItems(this.errorItems, propertyName);

    if (errors) {

      if (errors.maxlength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'MaxLengthValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '长度不能超过 200',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        this.errorItems.push(errorItem);
      }
      if (errors.required) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '必填',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        this.errorItems.push(errorItem);
      }

    }
    this.errorService.setErrorItems(this.errorItems);
  }

  private getValidators() {
    const validatorArrs = {
      Name: [
        Validators.maxLength(200),
        Validators.required
      ]
    };
    return validatorArrs;
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.productService
          .newOne(data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.listErrorCallBack(err);
          });
      } else {
        this.productService
          .detail(this.productId, data => {
            this.form = this.formService.createForm(data, this.getValidators());
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
    private alertService: AlertService,
    private errorService: ErrorService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }
  get productColorList(): FormArray { return this.form.get('ProductColorActionRequests') as FormArray; }
  get productSizeList(): FormArray { return this.form.get('ProductSizeActionRequests') as FormArray; }
  get productUnitList(): FormArray { return this.form.get('ProductUnitList') as FormArray; }
  get goodsList(): FormArray { return this.form.get('GoodsActionRequests') as FormArray; }


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


