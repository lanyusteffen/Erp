import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { PopupSelectorGoodsComponent } from '../../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { CustomerPopupSelectorComponent } from '../../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { PurchaseService } from '../../order.service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AlertService } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

const queryItemBase = {
  CustomerId: null,
  EmployeeId: null,
  DepartmentId: null,
  GoodsId: null,
  ProductId: null,
  BeginDate: null,
  EndDate: null
};

@Component({
  selector: 'app-purchase-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less'],
  providers: [
    PurchaseService,
    AlertService
  ]
})
export class PurchaseActionsComponent implements OnInit {

  @Output() onExecuteQuery: EventEmitter<any> = new EventEmitter();

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSelector: CustomerPopupSelectorComponent;

  @ViewChild(PopupSelectorEmployeeComponent)
  private employeePopupSelector: PopupSelectorEmployeeComponent;

  @ViewChild(PopupSelectorGoodsComponent)
  private goodsPopupSelector: PopupSelectorGoodsComponent;

  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private queryItem = null;

  constructor(
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService,
    private purchaseService: PurchaseService) {
    this.queryItem = Object.assign({}, queryItemBase);
  }

  selectCustomer(item: any): void {
    this.queryItem.CustomerId = item.Id;
  }

  selectEmployee(item: any): void {
    this.queryItem.CustomerId = item.Id;
  }

  selectGoods(item: any): void {
    this.queryItem.GoodsId = item.Id;
    this.queryItem.ProductId = item.ProductId;
  }

  ngOnInit() {
  }

  query() {
    this.onExecuteQuery.emit(this.queryItem);
  }
}
