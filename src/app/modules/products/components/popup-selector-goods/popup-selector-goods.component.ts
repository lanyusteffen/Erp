import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';
import { AlertService } from '@services/alert.service';
import { GoodsPopupSelectService } from './goods-popup-selector.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-popup-selector-goods',
  templateUrl: './popup-selector-goods.component.html',
  styleUrls: ['./popup-selector-goods.component.less'],
  providers: [ GoodsPopupSelectService,
    { provide: NG_VALUE_ACCESSOR, useExisting: PopupSelectorGoodsComponent, multi: true }
  ]
})
export class PopupSelectorGoodsComponent implements ControlValueAccessor {

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  @Output() onConfirm = new EventEmitter<any>();

  private innerValue: any;
  private onTouched = null;
  private onChange = null;
  private allSelected = false;
  private goods = <any>[];
  private pagination = {};
  private _showLabel = '';
  private _show: boolean;
  private _size = 10;
  private _selectedItems = <any>[];
  private _options = [
    { label: '10 条／页', value: 10 }
  ];

  getQuanlity(item: any) {
    // for (var _item in this._selectedItems) {
    //   if (_item.Id === item.Id) {

    //   }
    // }
  } 

  isSelected(item: any) {
    // for (var _item in this._selectedItems) {
    //   if (_item.Id === item.Id) {

    //   }
    // }
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    this.allSelected = false;
    if (isShow) {
      this.dataService.list(({ goods, currentPagination }) => {
        this.goods = goods;
        this.goods = this.goods.map(item => ({
          ...item,
          selected: this.isSelected(item),
          quanlity: this.getQuanlity(item)
        }));
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定货品列表失败!' + err
        });
      });
    }
  }

  @Output()
  get selectedItem() {
    return this._selectedItems;
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.goods = this.goods.map(item => ({
      ...item,
      selected: this.allSelected
    }));
  }

  select(item: any) {
    this._selectedItems.push(item);
  }

  selectConfirm(item: any) {
    this._selectedItems.push(item);
    this._showLabel = item.Name;
    this.closeModal();
  }

  unSelect() {
    this._selectedItems = <any>[];
    this._showLabel = '';
  }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  confirm() {
    if (this.selectedItem !== undefined) {
      this.onConfirm.emit(this.selectedItem);
      this._showLabel = this.selectedItem.Name;
    }
    this.closeModal();
  }

  onPageChange({ current, pageSize }) {
    this.dataService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, ({ goods, currentPagination }) => {
      this.goods = goods;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
  }

  onSearch(queryKey) {
    this.dataService.onSearch(queryKey, ({ goods, currentPagination }) => {
      this.goods = goods;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
  }

  constructor(private dataService: GoodsPopupSelectService,
              private alertService: AlertService) {
  }

  writeValue(value) {
    this.innerValue = value || 0;
    if (this.innerValue > 0) {
      this.dataService.list((data) => {
        this._showLabel = data.Name;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定货品列表失败!' + err
        });
      });
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  handleChange(value) {
    this.innerValue = value;
    this.onChange(value);
  }
}
