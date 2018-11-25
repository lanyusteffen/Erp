import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { PurchaseOrderService } from '../order.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';
import { DatePipe } from '@angular/common';
import { ErrorService } from '@services/error.service';

const purchaseItem = {
  PurchaseId: null,
  PurchaseCode: null,
  GoodsId: 0,
  ProductId: 0,
  Quanlity: 0.00,
  Price: null,
  StorageId: null,
  ProductUnitId: null,
  Amount: 0.00,
  TaxRate: null,
  TaxAmount: null,
  AfterTaxAmount: null,
  DiscountRate: null,
  DiscountAmount: null,
  AfterDiscountAmount: null,
  UnitTime: null,
  Spec: null,
  ProductUnitName: null,
  ProductColorValue: null,
  ProductColorId: 0,
  ProductSizeValue: null,
  ProductSizeId: 0,
  Name: null,
  SortIndex: 0
};

@Component({
  selector: 'app-purchase-order-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  providers: [ FormService, DatePipe ]
})

export class PurchaseOrderNewComponent implements OnInit, OnDestroy {

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSelector: CustomerPopupSelectorComponent;

  @ViewChild(PopupSelectorEmployeeComponent)
  private employeePopupSelector: PopupSelectorEmployeeComponent;

  @ViewChild(PopupSelectorGoodsComponent)
  private goodsPopupSelector: PopupSelectorGoodsComponent;

  private totalAmount: number | string;
  private payedAmount: number | string;
  private errorItems = new Array();

  private propertyName1 = null;
  private propertyName2 = null;
  private selectedCustomer: any;
  private selectedEmployee: any;
  private form = new FormGroup({});
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  showModal() {
    this.goodsPopupSelector.show = true;
  }

  get purchaseItemList(): FormArray { return this.form.get('ItemList') as FormArray; }
  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private errorService: ErrorService
  ) {
    this.totalAmount = 0.00;
    this.payedAmount = 0.00;
  }

  ngOnInit() {
    this.newOne();
  }

  ngOnDestroy() {
  }

  hasOpenTax() {
    const control = <FormControl>this.form.controls['IsOpenTax'];
    return control.value;
  }

  hasOpenDiscount() {
    const control = <FormControl>this.form.controls['IsOpenDiscount'];
    return control.value;
  }

  selectAllStorage(selectedStorageId) {
    const itemArr = <FormArray>this.form.controls['ItemList'];
    for (let i = 0; i < itemArr.length; i++) {
      itemArr.at(i).patchValue({'StorageId': selectedStorageId});
    }
  }

  selectProductUnit(selectedProductUnitTime, index) {
    const itemArr = <FormArray>this.form.controls['ItemList'];
    itemArr.at(index).patchValue({'UnitTime': selectedProductUnitTime});
  }

  selectCustomer(item: any): void {
    this.selectedCustomer = item;
    const customerTypeCtrl = <FormControl>this.form.controls['CustomerType'];
    const customerIdCtrl = <FormControl>this.form.controls['CustomerId'];
    customerTypeCtrl.setValue(this.customerPopupSelector.selectedTab);
    customerIdCtrl.setValue(item.Id);
    this.employeePopupSelector.unSelect();
  }

  selectEmployee(item: any): void {
    this.selectedEmployee = item;
    const employeeIdCtrl = <FormControl>this.form.controls['EmployeeId'];
    employeeIdCtrl.setValue(item.Id);
  }

  selectGoods(selectItems: any): void {

    selectItems.forEach(item => {

      const quanlity = parseInt(item.Quanlity, 10);

      let findIndex = -1;
      const purchaseItemArr = <FormArray>this.form.controls['ItemList'];

      for (let i = 0; i < purchaseItemArr.length; i++) {
        findIndex = i;
        const purchaseItemCtrl = <FormGroup>purchaseItemArr.at(findIndex);
        if ((<AbstractControl>purchaseItemCtrl.controls['GoodsId']).value > 0) {
          if (item.Id === (<AbstractControl>purchaseItemCtrl.controls['GoodsId']).value) {
            (<AbstractControl>purchaseItemCtrl.controls['Price']).setValue(angularMath.getNumberWithDecimals(item.Price, 2));
            (<AbstractControl>purchaseItemCtrl.controls['Quanlity']).setValue(angularMath.getNumberWithDecimals(quanlity, 2));
            return;
          }
        }
      }

      const newPurchaseItem = Object.assign({}, purchaseItem);

      newPurchaseItem.GoodsId = item.Id;
      newPurchaseItem.ProductId = item.ProductId;
      newPurchaseItem.ProductUnitId = item.ProductUnitId;
      newPurchaseItem.ProductUnitName = item.ProductUnitName;
      newPurchaseItem.ProductSizeValue = item.ProductSizeValue;
      newPurchaseItem.ProductColorValue = item.ProductColorValue;
      newPurchaseItem.UnitTime = 1.00; // 倍数为1, 则不会变
      newPurchaseItem.Spec = item.Spec;
      newPurchaseItem.TaxRate = 0.00;
      newPurchaseItem.DiscountRate = 0.00;
      newPurchaseItem.Quanlity = quanlity;
      newPurchaseItem.Price = item.Price;
      newPurchaseItem.Name = item.Name;
      newPurchaseItem.SortIndex = findIndex + 1;

      this.addPurchaseItem(findIndex + 1, newPurchaseItem);
    });

    this.calculate();
  }

  onSubmit({ value }, IsValid) {
    if (IsValid) {
      value.PurchaseTime = this.datePipe.transform(<Date>value.PurchaseTime, 'yyyy-MM-dd HH:mm:ss');
      if (value.Id === 0) {
        this.purchaseOrderService.create(value, data => {
          if (data.IsValid) {
            this.validate(data);
          } else {
            this.alertService.addFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.purchaseOrderService.modify(value, data => {
          if (data.IsValid) {
          } else {
            this.alertService.modifyFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.modifyFail(err);
        });
      }
    }
  }

  public setErrorMessage(propertyName, displayName, errors): void {
    this.errorService.removeErrorItems(this.errorItems, propertyName);

    if (errors) {

      if (errors.maxlength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'MaxLengthValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '长度不能超过 400',
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

      if (errors.result && !errors.result.valid) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'CustomerValidator',
          ErrorDescription: null,
          ErrorMessage: errors.result.errMsg,
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
      CustomerId: [
        Validators.required
      ]
    };
    return validatorArrs;
  }

  validate(data): void {
    if (data.IsValid) {
      this.alertService.open({
        type: 'success',
        content: '采购单' + data.Code + '新增成功！'
      });
    }
  }

  newOne() {
    this.purchaseOrderService
      .newOne(data => {
        data.ItemList = data.ItemList.map(item => ({
          ...item,
          Spec: null,
          Quanlity: null,
          Price: null,
          UnitTime: null,
          ProductUnitName: null,
          ProductColorValue: null,
          ProductColorId: null,
          ProductSizeValue: null,
          ProductSizeId: null
        }));
        this.propertyName1 = data.PropertyName1;
        this.propertyName2 = data.PropertyName2;
        data.PurchaseTime = this.datePipe.transform(<Date>data.PurchaseTime, 'yyyy-MM-dd'),
        this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Purchase, err);
      });
  }

  addPurchaseItem(idx, newPurchaseItem) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.insert(idx, this.fb.group(newPurchaseItem));
  }

  addItem(idx) {
    const control = <FormArray>this.form.controls['ItemList'];
    const newPurchaseItem = Object.assign({}, purchaseItem);
    control.insert(idx + 1, this.fb.group(newPurchaseItem));
  }

  removeItem(idx) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.removeAt(idx);
  }

  calculate() {
    this.calculateAll(0.00, -1);
  }

  calculateAll(calculatedPurchaseAmount, index) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== index) {
        calculatedPurchaseAmount += this.calculateItem('Price', i, false);
      }
    }

    this.totalAmount = angularMath.getNumberWithDecimals(calculatedPurchaseAmount, 2);

    const wholeDiscountAmount = (<FormControl>this.form.controls['WholeDiscountAmount']).value;
    let wholeDiscountRate = (<FormControl>this.form.controls['WholeDiscountRate']).value;
    wholeDiscountRate = wholeDiscountRate / 100.00;

    calculatedPurchaseAmount = calculatedPurchaseAmount * (1 - wholeDiscountRate);
    calculatedPurchaseAmount = calculatedPurchaseAmount - wholeDiscountAmount;

    this.payedAmount = angularMath.getNumberWithDecimals(calculatedPurchaseAmount, 2);
  }

  calculateItem(source, index, hasCalculateAll) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    const item = <FormGroup>itemArr.at(index);

    const currentProductId = (<FormControl>item.controls['ProductId']).value;

    if (!currentProductId || currentProductId <= 0) {
      return 0.00;
    }

    const isOpenTax = (<FormControl>this.form.controls['IsOpenTax']).value;
    const isOpenDiscount = (<FormControl>this.form.controls['IsOpenDiscount']).value;

    const quanlityCtrl = <AbstractControl>item.controls['Quanlity'];
    const priceCtrl = <AbstractControl>item.controls['Price'];
    const purchaseAmountCtrl = <AbstractControl>item.controls['Amount'];

    const discountRateCtrl = <AbstractControl>item.controls['DiscountRate'];
    const discountAmountCtrl = <AbstractControl>item.controls['DiscountAmount'];
    const afterDiscountAmountCtrl = <AbstractControl>item.controls['AfterDiscountAmount'];

    const taxRateCtrl = <AbstractControl>item.controls['TaxRate'];
    const taxAmountCtrl = <AbstractControl>item.controls['TaxAmount'];
    const afterTaxAmountCtrl = <AbstractControl>item.controls['AfterTaxAmount'];

    // 重新某货品的设置采购金额
    const purchaseAmount = quanlityCtrl.value * priceCtrl.value;
    purchaseAmountCtrl.setValue(angularMath.getNumberWithDecimals(purchaseAmount, 2));

    let afterDiscountAmount = purchaseAmount, afterTaxAmount = afterDiscountAmount;
    let discountAmount = 0.00, taxAmount = 0.00;
    let taxRate = taxRateCtrl.value, discountRate = discountRateCtrl.value;

    if (isOpenTax) {
      taxRate = taxRateCtrl.value / 100.00;
    }

    if (isOpenDiscount) {
      discountRate = discountRateCtrl.value / 100.00;
    }

    switch (source) {

      case 'Quanlity':
      case 'Price':
      case 'TaxRate':
      case 'DiscountRate':

        if (isOpenDiscount) {
          discountAmount = discountRate * purchaseAmount;
          discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(discountAmount, 2));
          afterDiscountAmount = purchaseAmount - discountAmount;
          afterTaxAmount = afterDiscountAmount;
          afterDiscountAmountCtrl.setValue(angularMath.getNumberWithDecimals(afterDiscountAmount, 2));
        }

        if (isOpenTax) {
          taxAmount = afterDiscountAmount * taxRate;
          taxAmountCtrl.setValue(angularMath.getNumberWithDecimals(taxAmount, 2));
          afterTaxAmount = afterDiscountAmount + taxAmount;
          afterTaxAmountCtrl.setValue(angularMath.getNumberWithDecimals(afterTaxAmount, 2));
        }

        break;

      case 'AfterDiscountAmount':

        afterDiscountAmount = afterDiscountAmountCtrl.value;
        discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(purchaseAmount - afterDiscountAmount, 2));
        discountRate = discountAmountCtrl.value / purchaseAmount;
        discountRateCtrl.setValue(angularMath.getNumberWithDecimals(discountRate, 2));

        if (isOpenTax) {
          taxAmount = afterDiscountAmount * taxRate;
          taxAmountCtrl.setValue(angularMath.getNumberWithDecimals(taxAmount, 2));
          afterTaxAmount = afterDiscountAmount + taxAmount;
          afterTaxAmountCtrl.setValue(angularMath.getNumberWithDecimals(afterTaxAmount, 2));
        }
        break;

      case 'AfterTaxAmount':

        if (isOpenDiscount) {
          discountAmount = discountRate * purchaseAmount;
          discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(discountAmount, 2));
          afterDiscountAmount = purchaseAmount - discountAmount;
          afterTaxAmount = afterDiscountAmount;
          afterDiscountAmountCtrl.setValue(angularMath.getNumberWithDecimals(afterDiscountAmount, 2));
        }

        afterTaxAmount = afterTaxAmountCtrl.value;
        taxAmount = afterTaxAmount - afterDiscountAmount;
        taxAmountCtrl.setValue(angularMath.getNumberWithDecimals(taxAmount, 2));
        taxRate = taxAmount / afterDiscountAmount;
        taxRateCtrl.setValue(angularMath.getNumberWithDecimals(taxRate, 2));
        break;
    }

    if (hasCalculateAll) {
      this.calculateAll(afterTaxAmount, index);
    }

    return afterTaxAmount;
  }
}
