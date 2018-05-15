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

  _show: boolean;
  _size = 10;
  _selectedItem: any;
  _options = [
    { label: '10 条／页', value: 10 }
  ];

  @Output() onSelectChanged = new EventEmitter<string>();

  @Output()
  get selectedItem() {
    return this._selectedItem;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listCustomer(({ customers, currentPagination }) => {
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

  select(item: any) {
    this._selectedItem = item;
  }

  selectConfirm(item: any) {
    this.select(item);
    this.onSelectChanged.emit(item.Name);
  }

  unSelect() {
    this._selectedItem = null;
    this.onSelectChanged.emit('');
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

  onSearch(queryKey) {
    this.dataService.onSearchCustomer(queryKey, ({ customers, currentPagination }) => {
      this.customers = customers;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定客户列表失败!' + err
      });
    });
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
