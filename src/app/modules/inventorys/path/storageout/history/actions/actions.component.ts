import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { StorageOutService } from '../../storageout.service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AlertService } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatePipe } from '@angular/common';
import { NavItem } from '@contracts/nav.item';

const queryItemBase = {
  CustomerId: null,
  EmployeeId: null,
  DepartmentId: null,
  GoodsId: null,
  ProductId: null,
  BeginDate: null,
  EndDate: null,
  BillType: null
};

@Component({
  selector: 'app-storageout-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less'],
  providers: [
    StorageOutService,
    AlertService,
    DatePipe
  ]
})
export class StorageOutActionsComponent implements OnInit {

  @Output() onExecuteQuery: EventEmitter<any> = new EventEmitter();

  @Input()
  selectNav: NavItem;

  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private queryItem = null;

  constructor(
    private loadingBar: SlimLoadingBarService,
    private datePipe: DatePipe,
    private storageOutService: StorageOutService) {
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

  selectBillType(selectedValue: any): void {
    this.queryItem.BillType = selectedValue;
  }

  ngOnInit() {
    this.storageOutService.getQueryDateRange(err => {
    }, data => {
      this.queryItem.BeginDate = this.datePipe.transform(<Date>data[0], 'yyyy-MM-dd');
      this.queryItem.EndDate = this.datePipe.transform(<Date>data[1], 'yyyy-MM-dd');
    });
  }

  query() {
    const queryItem = Object.assign({}, this.queryItem);
    this.onExecuteQuery.emit(queryItem);
  }
}
