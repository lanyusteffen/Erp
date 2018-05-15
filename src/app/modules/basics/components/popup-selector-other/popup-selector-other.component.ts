import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerPopupSelectorService } from '../customer-popup-selector/customer-popup-selector.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-popup-selector-other',
  templateUrl: './popup-selector-other.component.html',
  styleUrls: ['./popup-selector-other.component.less']
})
export class PopupSelectorOtherComponent {

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  private others = <any>[];
  private pagination = {};

  _isMultiSelect: boolean;
  _show: boolean;
  _size = 10;
  _selectedItem: any;
  _options = [
    { label: '10 条／页', value: 10 }
  ];

  @Output() onSelectChanged = new EventEmitter<string>();

  @Input()
  set isMultiSelect(value) {
    this._isMultiSelect = value;
  }

  @Output()
  get selectedItem() {
    return this._selectedItem;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listOthers(({ others, currentPagination }) => {
        this.others = others;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定其他往来单位列表失败!' + err
        });
      });
    }
  }

  select(item: any) {
    this._selectedItem = item;
  }

  selectConfirm(item: any) {
    this.onSelectChanged.emit(item.Name);
    this._selectedItem = item;
  }

  unSelect() {
    this._selectedItem = null;
    this.onSelectChanged.emit('');
  }

  onPageChange({ current, pageSize }) {
    this.dataService.onPageChangeOther({
      PageIndex: current,
      PageSize: pageSize
    }, ({ others, currentPagination }) => {
      this.others = others;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定其他往来单位列表失败!' + err
      });
    });
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
