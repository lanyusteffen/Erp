
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
  Quanlity: 0,
  Price: null,
  StorageId: null,
  ProductUnitId: null,
  PurchaseAmount: 0,
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

  private totalAmount: number = 0;
  private payedAmount: number = 0;

  private propertyName1 = null;
  private propertyName2 = null;
  private selectedCustomer: any;
  private selectedEmployee: any;
  private selectedGoods : number[] = [];
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

      let newPurchaseItem = Object.assign({}, purchaseItem);

      newPurchaseItem.GoodsId = item.Id;
      newPurchaseItem.ProductUnitName = item.ProductUnitName;
      newPurchaseItem.ProductSizeValue = item.ProductSizeValue;
      newPurchaseItem.ProductColorValue = item.ProductColorValue;
      newPurchaseItem.Spec = item.Spec;
      newPurchaseItem.Quanlity = item.Quanlity;
      newPurchaseItem.Price = item.Price;
      newPurchaseItem.Name = item.Name;

      if (findIndex == -1) {
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
    let newPurchaseItem = Object.assign({}, purchaseItem);
    control.insert(idx + 1, this.fb.group(newPurchaseItem));
  }

  removeItem(idx) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.removeAt(idx);
  }

  calculate(evt, source, index) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    const item = <FormGroup>itemArr.at(index);

    let isOpenTax = <FormControl>this.form.controls['IsOpenTax'].value;
    let isOpenDiscount = <FormControl>this.form.controls['IsOpenDiscount'].value;
    
    let quanlityCtrl = <AbstractControl>item.controls['Quanlity'];
    let priceCtrl = <AbstractControl>item.controls['Price'];
    let purchaseAmountCtrl = <AbstractControl>item.controls['PurchaseAmount'];

    let discountRateCtrl = <AbstractControl>item.controls['DiscountRate'];
    let discountAmountCtrl = <AbstractControl>item.controls['DiscountAmount'];
    let afterDiscountAmountCtrl = <AbstractControl>item.controls['AfterDiscountAmount'];

    let taxRateCtrl = <AbstractControl>item.controls['TaxRate'];
    let taxAmountCtrl = <AbstractControl>item.controls['TaxAmount'];
    let afterTaxAmountCtrl = <AbstractControl>item.controls['AfterTaxAmount'];

    let wholeDiscountAmountCtrl = <FormControl>this.form.controls['WholeDiscountAmount'];
    let wholeDiscountRateCtrl = <FormControl>this.form.controls['WholeDiscountRate'];
    
    purchaseAmountCtrl.setValue(quanlityCtrl.value * priceCtrl.value);

    switch (source) {

      case 'DiscountRate':

        if (isOpenDiscount) {
          discountAmountCtrl.setValue(purchaseAmountCtrl.value * discountRateCtrl.value);
          afterDiscountAmountCtrl.setValue(purchaseAmountCtrl.value - discountAmountCtrl.value);
        } 
        break;

      case 'AfterDiscountAmount':

        if (isOpenDiscount) {
          discountAmountCtrl.setValue(afterDiscountAmountCtrl.value - purchaseAmountCtrl.value);
          discountRateCtrl.setValue(angularMath.getNumberWithDecimals(discountAmountCtrl.value / purchaseAmountCtrl.value, 2));
        }
        break;

      case 'TaxRate':

        if (isOpenTax) {
          let toBeTaxAmount = 0.00;
          if (isOpenDiscount) {
            toBeTaxAmount = afterDiscountAmountCtrl.value;
          } else {
            toBeTaxAmount = purchaseAmountCtrl.value;
          }
          taxAmountCtrl.setValue(toBeTaxAmount * taxRateCtrl.value);
          afterTaxAmountCtrl.setValue(purchaseAmountCtrl.value + taxAmountCtrl.value);
        }
        break;

      case 'AfterTaxAmount':

        if (isOpenTax) {
          let toBeTaxAmount = 0.00;
          if (isOpenDiscount) {
            toBeTaxAmount = afterDiscountAmountCtrl.value;
          } else {
            toBeTaxAmount = purchaseAmountCtrl.value;
          }
          taxAmountCtrl.setValue(afterTaxAmountCtrl.value - toBeTaxAmount);
          taxRateCtrl.setValue(angularMath.getNumberWithDecimals(taxAmountCtrl.value / toBeTaxAmount, 2));
        }
        break;
    }
  }
}
