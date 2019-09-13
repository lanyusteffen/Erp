import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { SalesService } from '../order.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';
import { DatePipe } from '@angular/common';
import { ErrorService } from '@services/error.service';
import { PrimaryKeyValid } from '@validators/primary-key.valid';
import { NumberDecimalValid } from '@validators/number-decimal.valid';
import { SaleItemValid } from '@validators/sale-item.valid';
import { ActivatedRoute } from '@angular/router';

const saleItem = {
  SaleId: null,
  SaleCode: null,
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
  ProductColorId: 0,
  ProductSizeValue: null,
  ProductSizeId: 0,
  Name: null,
  SortIndex: 0
};

@Component({
  selector: 'app-sale-order-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  providers: [ FormService, DatePipe ]
})

export class SaleNewComponent implements OnInit, OnDestroy {

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
  private form: FormGroup;
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private subscribe: any;
  private isEditing: boolean;
  private operatorType: string;

  showModal() {

    const saleItemArr = <FormArray>this.form.controls['ItemList'];
    const selectedGoods = new Array();

    for (let i = 0; i < saleItemArr.length; i++) {
      const saleItemCtrl = <FormGroup>saleItemArr.at(i);
      const goods = {
        Id: (<AbstractControl>saleItemCtrl.controls['GoodsId']).value,
        Price: Number(<AbstractControl>saleItemCtrl.controls['Price'].value),
        Quanlity: Number(<AbstractControl>saleItemCtrl.controls['Quanlity'].value)
      };
      selectedGoods.push(goods);
    }

    this.goodsPopupSelector.selectedGoods = selectedGoods;
    this.goodsPopupSelector.show = true;
  }

  get saleItemList(): FormArray {
    return this.form.get('ItemList') as FormArray;
  }

  get formReady(): boolean {
    if (this.form) {
      return !!Object.keys(this.form.controls).length;
    }
    return false;
  }

  constructor(
    private saleService: SalesService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private errorService: ErrorService,
    private routeInfo: ActivatedRoute
  ) {
    this.totalAmount = 0.00;
    this.payedAmount = 0.00;
  }

  ngOnInit() {
    this.subscribe = this.routeInfo.queryParamMap.subscribe(
      params => {
        const saleId = params.get('id');
        this.operatorType = params.get('type');
        if (this.operatorType === 'new') {
          this.new();
          this.isEditing = false;
        } else if (this.operatorType === 'edit') {
          this.edit(saleId);
          this.isEditing = true;
        } else if (this.operatorType === 'copy') {
          this.copy(saleId);
          this.isEditing = true;
        }
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
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
    const customerIdCtrl = <FormControl>this.form.controls['SupplierId'];
    customerTypeCtrl.setValue(this.customerPopupSelector.selectedTab);
    customerIdCtrl.setValue(item.Id);
    this.employeePopupSelector.reset();
  }

  selectEmployee(item: any): void {
    this.selectedEmployee = item;
    const employeeIdCtrl = <FormControl>this.form.controls['EmployeeId'];
    employeeIdCtrl.setValue(item.Id);
  }

  selectGoods(selectItems: any): void {

    selectItems.forEach(item => {

      const quanlity = Number(item.Quanlity);

      let findIndex = -1;
      const saleItemArr = <FormArray>this.form.controls['ItemList'];

      for (let i = 0; i < saleItemArr.length; i++) {
        findIndex = i;
        const saleItemCtrl = <FormGroup>saleItemArr.at(findIndex);
        if ((<AbstractControl>saleItemCtrl.controls['GoodsId']).value > 0) {
          if (item.Id === (<AbstractControl>saleItemCtrl.controls['GoodsId']).value) {
            (<AbstractControl>saleItemCtrl.controls['Price']).setValue(angularMath.getNumberWithDecimals(item.Price, 2));
            (<AbstractControl>saleItemCtrl.controls['Quanlity']).setValue(angularMath.getNumberWithDecimals(quanlity, 2));
            return;
          }
        }
      }

      const newSaleItem = Object.assign({}, saleItem);

      newSaleItem.GoodsId = item.Id;
      newSaleItem.ProductId = item.ProductId;
      newSaleItem.ProductUnitId = item.ProductUnitId;
      newSaleItem.ProductUnitName = item.ProductUnitName;
      newSaleItem.ProductSizeValue = item.ProductSizeValue;
      newSaleItem.ProductColorValue = item.ProductColorValue;
      newSaleItem.UnitTime = 1.00; // 倍数为1, 则不会变
      newSaleItem.Spec = item.Spec;
      newSaleItem.TaxRate = 0.00;
      newSaleItem.DiscountRate = 0.00;
      newSaleItem.Quanlity = quanlity;
      newSaleItem.Price = item.Price;
      newSaleItem.Name = item.Name;
      newSaleItem.SortIndex = findIndex + 1;

      this.addSaleItem(findIndex + 1, newSaleItem);
    });

    this.calculate();
  }

  private reset(): void {

    this.payedAmount = 0.00;
    this.totalAmount = 0.00;

    this.clearSelectGoods();
    this.clearSummaryControl();

    this.goodsPopupSelector.reset();
  }

  private clearSummaryControl(): void {
    (<FormControl>this.form.controls['WholeDiscountAmount']).patchValue(null);
    (<FormControl>this.form.controls['WholeDiscountRate']).patchValue(null);
  }

  private clearSelectGoods(): void {
    const itemArr = <FormArray>this.form.controls['ItemList'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== 0) {
        itemArr.removeAt(i);
        --i;
      }
    }
    this.form.controls['ItemList'] = itemArr;
  }

  onSubmit({ value }, isValid) {
    if (isValid) {
      value.SaleTime = this.datePipe.transform(<Date>value.SaleTime, 'yyyy-MM-dd HH:mm:ss');
      if (value.Id === 0) {
        this.saleService.create(value, data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '销售单' + data.Code + '新增成功！'
            });
            this.reset();
          } else {
            this.alertService.addFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.saleService.modify(value, data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '销售单' + data.Code + '修改成功！'
            });
            this.reset();
          } else {
            this.alertService.modifyFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.modifyFail(err);
        });
      }
    } else {
      this.errorService.renderErrorItems(this.form,
        (key, controlErrors) => this.getErrorMessage(key, controlErrors));
    }
  }

  getErrorMessage(key: string, controlErrors: ValidationErrors) {
    switch (key) {
      case 'CustomerId':
        return '必须选择供应商!';
    }
    return controlErrors.errMsg;
  }

  private getValidators() {
    const validatorArrs = {
      CustomerId: [
        Validators.required,
        PrimaryKeyValid.validation
      ],
      WholeDiscountRate: [
        NumberDecimalValid.validation
      ],
      WholeDiscountAmount: [
        NumberDecimalValid.validation
      ],
      ItemList: [
        SaleItemValid.validation
      ]
    };
    return validatorArrs;
  }

  copy(saleId) {
    this.saleService
    .copyNew(saleId, data => {
      this.propertyName1 = data.PropertyName1;
      this.propertyName2 = data.PropertyName2;
      data.SaleTime = this.datePipe.transform(<Date>data.SaleTime, 'yyyy-MM-dd'),
      this.form = this.formService.createForm(data, this.getValidators());
      this.payedAmount = data.PayAmount;
      this.totalAmount = data.AfterDiscountAmount;
    }, (err) => {
      this.alertService.getErrorCallBack(ModuleName.Sale, err);
    });
  }

  edit(saleId) {
    this.saleService
      .updateOne(saleId, data => {
        this.propertyName1 = data.PropertyName1;
        this.propertyName2 = data.PropertyName2;
        data.SaleTime = this.datePipe.transform(<Date>data.SaleTime, 'yyyy-MM-dd'),
        this.form = this.formService.createForm(data, this.getValidators());
        this.payedAmount = data.PayAmount;
        this.totalAmount = data.AfterDiscountAmount;
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Sale, err);
      });
  }

  new() {
    this.saleService
      .addNew(data => {
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
        data.SaleTime = this.datePipe.transform(<Date>data.SaleTime, 'yyyy-MM-dd'),
        this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Sale, err);
      });
  }

  addSaleItem(idx, newSaleItem) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.insert(idx, this.fb.group(newSaleItem));
  }

  addItem(idx) {
    const control = <FormArray>this.form.controls['ItemList'];
    const newSaleItem = Object.assign({}, saleItem);
    control.insert(idx + 1, this.fb.group(newSaleItem));
  }

  removeItem(idx) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.removeAt(idx);
  }

  calculate() {
    this.calculateAll(0.00, -1);
  }

  calculateAll(calculatedSaleAmount, index) {

    const itemArr = <FormArray>this.form.controls['ItemList'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== index) {
        calculatedSaleAmount += this.calculateItem('Price', i, false);
      }
    }

    this.totalAmount = angularMath.getNumberWithDecimals(calculatedSaleAmount, 2);

    const wholeDiscountAmount = (<FormControl>this.form.controls['WholeDiscountAmount']).value;
    let wholeDiscountRate = (<FormControl>this.form.controls['WholeDiscountRate']).value;
    wholeDiscountRate = wholeDiscountRate / 100.00;

    calculatedSaleAmount = calculatedSaleAmount * (1 - wholeDiscountRate);
    calculatedSaleAmount = calculatedSaleAmount - wholeDiscountAmount;

    this.payedAmount = angularMath.getNumberWithDecimals(calculatedSaleAmount, 2);
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
    const saleAmountCtrl = <AbstractControl>item.controls['PurchaseAmount'];

    const discountRateCtrl = <AbstractControl>item.controls['DiscountRate'];
    const discountAmountCtrl = <AbstractControl>item.controls['DiscountAmount'];
    const afterDiscountAmountCtrl = <AbstractControl>item.controls['AfterDiscountAmount'];

    const taxRateCtrl = <AbstractControl>item.controls['TaxRate'];
    const taxAmountCtrl = <AbstractControl>item.controls['TaxAmount'];
    const afterTaxAmountCtrl = <AbstractControl>item.controls['AfterTaxAmount'];

    // 重新某货品的设置销售金额
    const saleAmount = quanlityCtrl.value * priceCtrl.value;
    saleAmountCtrl.setValue(angularMath.getNumberWithDecimals(saleAmount, 2));

    let afterDiscountAmount = saleAmount, afterTaxAmount = afterDiscountAmount;
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
          discountAmount = discountRate * saleAmount;
          discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(discountAmount, 2));
          afterDiscountAmount = saleAmount - discountAmount;
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
        discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(saleAmount - afterDiscountAmount, 2));
        discountRate = discountAmountCtrl.value / saleAmount;
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
          discountAmount = discountRate * saleAmount;
          discountAmountCtrl.setValue(angularMath.getNumberWithDecimals(discountAmount, 2));
          afterDiscountAmount = saleAmount - discountAmount;
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
