import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PurchaseService } from '../../order.service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AlertService } from '@services/alert.service';
import { PopupSelectorGoodsSimpleComponent } from '../../../../../products/components/popup-selector-goods-simple/popup-selector-goods-simple.component';
import { DatePipe } from '@angular/common';

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
    AlertService,
    DatePipe
  ]
})
export class PurchaseActionsComponent implements OnInit {

  @ViewChild(PopupSelectorGoodsSimpleComponent)
  private goodsPopupSelector: PopupSelectorGoodsSimpleComponent;

  @ViewChild('queryGoodsName')
  private el: ElementRef;

  private selectedCustomer: any;
  private selectedEmployee: any;

  @Output() onExecuteQuery: EventEmitter<any> = new EventEmitter();

  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private queryItem = null;

  constructor(
    private datePipe: DatePipe,
    private elementRef: ElementRef,
    private purchaseService: PurchaseService) {
    this.queryItem = Object.assign({}, queryItemBase);
  }

  selectCustomer(item: any): void {
    this.selectCustomer = item;
    this.queryItem.CustomerId = item.Id;
  }

  selectEmployee(item: any): void {
    this.selectEmployee = item;
    this.queryItem.EmployeeId = item.Id;
  }

  selectGoods(item: any): void {
    this.el.nativeElement.value = item[0].Name;
    this.queryItem.GoodsId = item[0].Id;
    this.queryItem.ProductId = item[0].ProductId;
  }

  selectDepartment(selectedValue: any): void {
    this.queryItem.DepartmentId = selectedValue;
  }

  ngOnInit() {
    this.purchaseService.getQueryDateRange(err => {
    }, data => {
      this.queryItem.BeginDate = this.datePipe.transform(<Date>data[0], 'yyyy-MM-dd');
      this.queryItem.EndDate = this.datePipe.transform(<Date>data[1], 'yyyy-MM-dd');
    });
  }

  query() {
    const queryItem = Object.assign({}, this.queryItem);
    this.onExecuteQuery.emit(queryItem);
  }

  showModal() {
    this.goodsPopupSelector.show = true;
  }
}
