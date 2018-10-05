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
  Quanlity: null,
  Price: null,
  DiscountRate: null,
  DiscountAmount: 0,
  AfterDiscountAmount: false,
  TaxRate: true,
  TaxAmount: null,
  AfterTaxAmount: null,
  StorageId: null,
  ProductUnitId: null,
  PurchaseAmount: 0,
  StorageInQuanlity: null,
  UnitTime: null,
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

  private selectedCustomer: any;
  private selectedEmployee: any;
  private selectedGoods: any;
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

  selectGoods(item: any): void {
    
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
    } else {
    }
  }

  newOne() {
    this.purchaseOrderService
      .newOne(data => {
        this.form = this.formService.createForm(data);
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Purchase, err);
      });
  }

  addPurchaseItem(idx) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.insert(idx + 1, this.fb.group(purchaseItem));
  }

  removePurchaseItem(idx) {

    const control = <FormArray>this.form.controls['ItemList'];
    control.removeAt(idx);
  }
}
