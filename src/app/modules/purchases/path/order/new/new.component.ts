import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { PurchaseOrderService } from '../order.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';

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
  ) {}

  ngOnInit() {
    this.newOne();
  }

  ngOnDestroy() {
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
        const control = <FormArray>this.form.controls['ItemList'];
        control.removeAt(findIndex);
      }

      let newPurchaseItem = Object.assign({}, purchaseItem);

      newPurchaseItem.GoodsId = item.Id;
      newPurchaseItem.ProductUnitName = item.ProductUnitName;
      newPurchaseItem.ProductSizeValue = item.ProductSizeValue;
      newPurchaseItem.ProductColorValue = item.ProductColorValue;
      newPurchaseItem.Spec = item.Spec;
      newPurchaseItem.Quanlity = item.Quanlity;
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
}
