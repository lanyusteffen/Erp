import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerPopupSelectorService } from '../customer-popup-selector/customer-popup-selector.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-popup-selector-customer',
  templateUrl: './popup-selector-customer.component.html',
  styleUrls: ['./popup-selector-customer.component.less']
})
export class PopupSelectorCustomerComponent {

  // 获取模板内的第一个指定组件
  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  private customers = <any>[];
  private pagination = {};

  _isMultiSelect: boolean;
  _show: boolean;

  @Output() onSelectChanged = new EventEmitter<string>();

  @Input()
  set isMultiSelect(value) {
    this._isMultiSelect = value;
  }

  private _options = [
    { label: '10 条／页', value: 10 }
  ];
  private _size = 10;

  _selectedItem: any;

  select(item: any) {
    this.onSelectChanged.emit(item.Name);
    this._selectedItem = item;
  }

  @Output()
  get selectedValue() {
    return this._selectedItem.Id;
  }

  @Output()
  get selectedItem() {
    return this._selectedItem;
  }

  get show() {
    return this._show;
  }

  onPageChange({ current, pageSize }) {
    this.dataService.onPageChangeCustomer({
      PageIndex: current,
      PageSize: pageSize
    }, ({ customers, currentPagination }) => {
      this.customers = customers;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定客户列表失败!' + err
      });
    });
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listCustomers(({ customers, currentPagination }) => {
        this.customers = customers;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定客户列表失败!' + err
        });
      });
    }
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
