import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { StorageBillTypeSelectorComponent } from '../../../components/storagebilltype-selector/storagebilltype-selector.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { StorageOutService } from '../storageout.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';
import { DatePipe } from '@angular/common';
import { ErrorService } from '@services/error.service';
import { PrimaryKeyValid } from '@validators/primary-key.valid';
import { StorageOutItemValid } from '@validators/storageOut-item.valid';
import { ActivatedRoute } from '@angular/router';

const StorageOutItemActionRequest = {
  BelongBillId: null,
  BelongBillCode: null,
  BelongBillTime: null,
  BillType: 0,
  GoodsId: 0,
  ProductId: 0,
  Quanlity: 0.00,
  Price: null,
  StorageId: null,
  ProductUnitId: null,
  Amount: 0.00,
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
  selector: 'app-storageout-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  providers: [FormService, DatePipe]
})

export class StorageOutNewComponent implements OnInit, OnDestroy {

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSelector: CustomerPopupSelectorComponent;

  @ViewChild(PopupSelectorEmployeeComponent)
  private employeePopupSelector: PopupSelectorEmployeeComponent;

  @ViewChild(PopupSelectorGoodsComponent)
  private goodsPopupSelector: PopupSelectorGoodsComponent;

  @ViewChild(StorageBillTypeSelectorComponent)
  private storageBillTypeSelector: StorageBillTypeSelectorComponent;

  private totalAmount: number | string;
  private payedAmount: number | string;
  private errorItems = new Array();
  private subscribe: any;
  private operatorType: string;
  private isEditing: boolean;

  private propertyName1 = null;
  private propertyName2 = null;
  private selectedCustomer: any;
  private selectedEmployee: any;
  private form: FormGroup;
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  showModal() {
    this.goodsPopupSelector.show = true;
  }

  get storageOutItemList(): FormArray {
    return this.form.get('StorageOutItemActionRequests') as FormArray;
  }

  get formReady(): boolean {
    if (this.form) {
      return !!Object.keys(this.form.controls).length;
    }
    return false;
  }

  constructor(
    private storageOutService: StorageOutService,
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
    console.log(this.routeInfo);
    this.subscribe = this.routeInfo.queryParamMap.subscribe(
      params => {
        const id = params.get("id");
        this.operatorType = params.get("type");
        if (this.operatorType === 'new') {
          this.newOne();
          this.isEditing = false;
        } else if (this.operatorType === 'edit') {
          this.edit(id);
          this.isEditing = true;
        }
      });
    this.newOne();
  }

  ngOnDestroy() {
  }

  selectAllStorage(selectedStorageId) {
    const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    for (let i = 0; i < itemArr.length; i++) {
      itemArr.at(i).patchValue({ 'StorageId': selectedStorageId });
    }
  }

  selectProductUnit(selectedProductUnitTime, index) {
    const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    itemArr.at(index).patchValue({ 'UnitTime': selectedProductUnitTime });
  }

  private clearSelectGoods(): void {
    const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== 0) {
        itemArr.removeAt(i);
        --i;
      }
    }
    this.form.controls['StorageOutItemActionRequests'] = itemArr;
  }

  private reset(): void {

    this.payedAmount = 0.00;
    this.totalAmount = 0.00;

    this.clearSelectGoods();

    this.goodsPopupSelector.reset();
    this.customerPopupSelector.reset();
    this.employeePopupSelector.reset();
  }

  selectCustomer(item: any): void {
    this.selectedCustomer = item;
    const customerTypeCtrl = <FormControl>this.form.controls['CustomerType'];
    const customerIdCtrl = <FormControl>this.form.controls['CustomerId'];
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

      const quanlity = parseInt(item.Quanlity, 10);

      let findIndex = -1;
      const StorageOutItemActionRequestArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];

      for (let i = 0; i < StorageOutItemActionRequestArr.length; i++) {
        findIndex = i;
        const StorageOutItemActionRequestCtrl = <FormGroup>StorageOutItemActionRequestArr.at(findIndex);
        if ((<AbstractControl>StorageOutItemActionRequestCtrl.controls['GoodsId']).value > 0) {
          if (item.Id === (<AbstractControl>StorageOutItemActionRequestCtrl.controls['GoodsId']).value) {
            (<AbstractControl>StorageOutItemActionRequestCtrl.controls['Price']).setValue(angularMath.getNumberWithDecimals(item.Price, 2));
            // tslint:disable-next-line:max-line-length
            (<AbstractControl>StorageOutItemActionRequestCtrl.controls['Quanlity']).setValue(angularMath.getNumberWithDecimals(quanlity, 2));
            return;
          }
        }
      }

      const newStorageOutItemActionRequest = Object.assign({}, StorageOutItemActionRequest);

      newStorageOutItemActionRequest.GoodsId = item.Id;
      newStorageOutItemActionRequest.ProductId = item.ProductId;
      newStorageOutItemActionRequest.ProductUnitId = item.ProductUnitId;
      newStorageOutItemActionRequest.ProductUnitName = item.ProductUnitName;
      newStorageOutItemActionRequest.ProductSizeValue = item.ProductSizeValue;
      newStorageOutItemActionRequest.ProductColorValue = item.ProductColorValue;
      newStorageOutItemActionRequest.UnitTime = 1.00; // 倍数为1, 则不会变
      newStorageOutItemActionRequest.Spec = item.Spec;
      newStorageOutItemActionRequest.Quanlity = quanlity;
      newStorageOutItemActionRequest.Price = item.Price;
      newStorageOutItemActionRequest.Name = item.Name;
      newStorageOutItemActionRequest.SortIndex = findIndex + 1;

      this.addStorageOutItemActionRequest(findIndex + 1, newStorageOutItemActionRequest);
    });

    this.calculate();
  }

  onSubmit({ value }, isValid) {
    if (isValid) {
      value.BillTime = this.datePipe.transform(<Date>value.BillTime, 'yyyy-MM-dd HH:mm:ss');
      if (value.Id === 0) {
        this.storageOutService.create(value, data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '出库单' + data.Code + '新增成功！'
            });
            this.reset();
          } else {
            this.alertService.addFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.storageOutService.modify(value, data => {
          if (data.IsValid) {
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
      StorageOutItemActionRequests: [
        StorageOutItemValid.validation
      ]
    };
    return validatorArrs;
  }

  edit(id) {
    this.storageOutService
      .updateOne(id, data => {
        data.StorageOutItemActionRequests = data.StorageOutItemActionRequests.map(item => ({
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
        debugger;
        data.BillTime = this.datePipe.transform(<Date>data.BillTime, 'yyyy-MM-dd'),
          this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Purchase, err);
      });
  }

  newOne() {
    this.storageOutService
      .newOne(data => {
        data.StorageOutItemActionRequests = data.StorageOutItemActionRequests.map(item => ({
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
        data.BillTime = this.datePipe.transform(<Date>data.BillTime, 'yyyy-MM-dd'),
          this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Purchase, err);
      });
  }

  addStorageOutItemActionRequest(idx, newStorageOutItemActionRequest) {

    const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    control.insert(idx, this.fb.group(newStorageOutItemActionRequest));
  }

  addItem(idx) {
    const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    const newStorageOutItemActionRequest = Object.assign({}, StorageOutItemActionRequest);
    control.insert(idx + 1, this.fb.group(newStorageOutItemActionRequest));
  }

  removeItem(idx) {

    const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    control.removeAt(idx);
  }

  calculate() {
    this.calculateAll(0.00, -1);
  }

  calculateAll(calculatedPurchaseAmount, index) {

    const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    for (let i = 0; i < itemArr.length; i++) {
      if (i !== index) {
        calculatedPurchaseAmount += this.calculateItem('Price', i, false);
      }
    }

    this.totalAmount = angularMath.getNumberWithDecimals(calculatedPurchaseAmount, 2);

    this.payedAmount = angularMath.getNumberWithDecimals(calculatedPurchaseAmount, 2);
  }

  calculateItem(source, index, hasCalculateAll) {

    const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
    const item = <FormGroup>itemArr.at(index);

    const currentProductId = (<FormControl>item.controls['ProductId']).value;

    if (!currentProductId || currentProductId <= 0) {
      return 0.00;
    }

    const quanlityCtrl = <AbstractControl>item.controls['Quanlity'];
    const priceCtrl = <AbstractControl>item.controls['Price'];
    const amountCtrl = <AbstractControl>item.controls['Amount'];

    // 重新某货品的设置采购金额
    const purchaseAmount = quanlityCtrl.value * priceCtrl.value;
    amountCtrl.setValue(angularMath.getNumberWithDecimals(purchaseAmount, 2));
    return purchaseAmount;
  }
}
