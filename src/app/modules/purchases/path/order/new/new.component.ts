
import { FormGroup, FormArray, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { PurchaseOrderService } from '../order.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';

const purchaseItem = {
  PurchaseId: null,
  PurchaseCode: null,
  GoodsId: 0,
  ProductId: 0,
  Quanlity: 0.00,
  Price: null,
  StorageId: null,
  ProductUnitId: null,
  PurchaseAmount: 0.00,
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
  ProductSizeValue: null,
  Name: null,
};

@Component({
  selector: 'app-purchase-order-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  providers: [FormService]
})

export class PurchaseOrderNewComponent implements OnInit, OnDestroy {

  @ViewChild(PopupSelectorEmployeeComponent)
  private EmployeePopupSelector: PopupSelectorEmployeeComponent;

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSelector: CustomerPopupSelectorComponent;

  @ViewChild(PopupSelectorGoodsComponent)
  private goodsPopupSelector: PopupSelectorGoodsComponent;

  private totalAmount: number | string;
  private payedAmount: number | string;

  private propertyName1 = null;
  private propertyName2 = null;
  private selectedCustomer: any;
  private selectedEmployee: any;
  private selectedGoods: number[] = [];
  private form = new FormGroup({});
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD HH:mm:ss'
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
    private alertService: AlertService
  ) {
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

  selectCustomer(item: any): void {
    this.selectCustomer = item;
    this.customerPopupSelector.unSelect();
  }

  selectEmployee(item: any): void {
    this.selectedEmployee = item;
  }

  selectGoods(selectItems: any): void {

    selectItems.forEach(item => {
      let findIndex = this.selectedGoods.indexOf(item.Id);

      if (findIndex > -1) {
        findIndex = findIndex + 1;
        const itemArr = <FormArray>this.form.controls['ItemList'];
        itemArr.removeAt(findIndex);
      }

      const newPurchaseItem = Object.assign({}, purchaseItem);

      newPurchaseItem.GoodsId = item.Id;
      newPurchaseItem.ProductId = item.ProductId;
      newPurchaseItem.ProductUnitName = item.ProductUnitName;
      newPurchaseItem.ProductSizeValue = item.ProductSizeValue;
      newPurchaseItem.ProductColorValue = item.ProductColorValue;
      newPurchaseItem.Spec = item.Spec;
      newPurchaseItem.TaxRate = 0.00;
      newPurchaseItem.DiscountRate = 0.00;
      newPurchaseItem.Quanlity = item.Quanlity;
      newPurchaseItem.Price = item.SalePrice;
      newPurchaseItem.Name = item.Name;

      if (findIndex === -1) {
        findIndex = 1;
      }

      this.addPurchaseItem(findIndex, newPurchaseItem);
      this.selectedGoods.push(item.Id);
    });
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
    } else {
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
          ProductUnitName: null,
          ProductColorValue: null,
          ProductSizeValue: null
        }));
        this.propertyName1 = data.PropertyName1;
        this.propertyName2 = data.PropertyName2;
        this.form = this.formService.createForm(data);
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

  calculateAll(evt, calculatedPurchaseAmount, index) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== index) {
        calculatedPurchaseAmount += this.calculateItem(evt, 'Price', i, false);
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

  calculateItem(evt, source, index, hasCalculateAll) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    const item = <FormGroup>itemArr.at(index);

    const isOpenTax = <FormControl>this.form.controls['IsOpenTax'].value;
    const isOpenDiscount = <FormControl>this.form.controls['IsOpenDiscount'].value;

    const quanlityCtrl = <AbstractControl>item.controls['Quanlity'];
    const priceCtrl = <AbstractControl>item.controls['Price'];
    const purchaseAmountCtrl = <AbstractControl>item.controls['PurchaseAmount'];

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
      this.calculateAll(evt, afterTaxAmount, index);
    }

    return afterTaxAmount;
  }
}
