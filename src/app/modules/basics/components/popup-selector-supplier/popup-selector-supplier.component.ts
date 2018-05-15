import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerPopupSelectorService } from '../customer-popup-selector/customer-popup-selector.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-popup-selector-supplier',
  templateUrl: './popup-selector-supplier.component.html',
  styleUrls: ['./popup-selector-supplier.component.less']
})
export class PopupSelectorSupplierComponent {

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  private suppliers = <any>[];
  private pagination = {};

  _show: boolean;
  _selectedItem: any;
  _size = 10;

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
      this.dataService.listSupplier(({ suppliers, currentPagination }) => {
        this.suppliers = suppliers;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定供应商列表失败!' + err
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
    this.dataService.onPageChangeSupplier({
      PageIndex: current,
      PageSize: pageSize
    }, ({ suppliers, currentPagination }) => {
      this.suppliers = suppliers;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定供应商列表失败!' + err
      });
    });
  }

  onSearch(queryKey) {
    this.dataService.onSearchSupplier(queryKey, ({ suppliers, currentPagination }) => {
      this.suppliers = suppliers;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定供应商列表失败!' + err
      });
    });
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
