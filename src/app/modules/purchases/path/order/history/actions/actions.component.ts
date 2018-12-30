import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PurchaseService } from '../../order.service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AlertService } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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

  @Output() onExecuteQuery: EventEmitter<any> = new EventEmitter();

  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private queryItem = null;

  constructor(
    private loadingBar: SlimLoadingBarService,
    private datePipe: DatePipe,
    private purchaseService: PurchaseService) {
    this.queryItem = Object.assign({}, queryItemBase);
  }

  selectCustomer(item: any): void {
    this.queryItem.CustomerId = item.Id;
  }

  selectEmployee(item: any): void {
    this.queryItem.EmployeeId = item.Id;
  }

  selectGoods(item: any): void {
    this.queryItem.GoodsId = item.Id;
    this.queryItem.ProductId = item.ProductId;
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
    this.onExecuteQuery.emit(this.queryItem);
  }
}
