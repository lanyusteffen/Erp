import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';
import { AlertService } from '@services/alert.service';
import { GoodsPopupSelectService } from '../popup-selector-goods/goods-popup-selector.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-popup-selector-goods-simple',
  templateUrl: './popup-selector-goods-simple.component.html',
  styleUrls: ['./popup-selector-goods-simple.component.less'],
  providers: [
    GoodsPopupSelectService,
    { provide: NG_VALUE_ACCESSOR, useExisting: PopupSelectorGoodsSimpleComponent, multi: true }
  ]
})
export class PopupSelectorGoodsSimpleComponent implements ControlValueAccessor {

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  @Input()
  set customerId(value) {
    this.dataService.setCustomerId(value);
  }

  @Output() onConfirm = new EventEmitter<any>();

  private propertyName1 = null;
  private propertyName2 = null;
  private onTouched = null;
  private onChange = null;
  private goods = <any>[];
  private pagination = {};
  private _show: boolean;
  private _size = 10;
  private _selectedItems = <any>[];
  private _options = [
    { label: '10 条／页', value: 10 }
  ];

  getQuanlity(item: any) {
    let returnValue = '';
    this._selectedItems.forEach(_item => {
      if (_item.Id === item.Id) {
        returnValue = _item.Quanlity;
      }
    });
    return returnValue;
  }

  isSelected(item: any) {
    let returnValue = false;
    this._selectedItems.forEach(_item => {
      if (_item.Id === item.Id) {
        returnValue = _item.Selected;
      }
    });
    return returnValue;
  }

  getCurrentPrice(item: any) {
    let returnValue = 0;
    this._selectedItems.forEach(_item => {
      if (_item.Id === item.Id) {
        returnValue = _item.CurrentPrice;
      }
    });
    return returnValue;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.list(({ goods, currentPagination, propertyName1, propertyName2 }) => {
        this.bindTable(goods, currentPagination, propertyName1, propertyName2);
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定货品列表失败!' + err
        });
      });
    }
  }

  @Input()
  set selectedGoods(goodsInfo: any[]) {
    goodsInfo.forEach(_goods => {
      this._selectedItems.forEach(_item => {
        if (_goods.Id === _item.Id) {
          _item.Quanlity = _goods.Quanlity;
          _item.Price = _goods.Price;
          _item.CurrentPrice = _goods.CurrentPrice;
        }
      });
    });
  }

  select(evt, item: any) {
    this._selectedItems = [];
    const finded = false;
    item.Selected = true;
    item.Quanlity = 0.00;
    if (!finded) {
      this._selectedItems.push(item);
    }
    this.makeListRefresh(item, item.Quanlity, evt.target.checked);
  }

  makeListRefresh(item, quanlity, isSelected) {
    this.goods.forEach(good => {
      if (good.Id === item.Id) {
        good.Quanlity = quanlity;
        good.Selected = isSelected;
        good.CurrentPrice = item.CurrentPrice;
      }
    });
  }

  inputQuanlity(evt, item: any) {
    let finded = false;
    item.Selected = true;
    item.Quanlity = evt.target.value;
    this._selectedItems.forEach(_item => {
      if (_item.Id === item.Id) {
        _item.Quanlity = evt.target.value;
        _item.Selected = true;
        _item.CurrentPrice = item.CurrentPrice;
        finded = true;
      }
    });
    if (!finded) {
      this._selectedItems.push(item);
    }
    this.makeListRefresh(item, item.Quanlity, true);
  }

  reset() {
    this._selectedItems = <any>[];
  }

  closeModal() {
    this.show = false;
  }

  confirm() {
    this.onConfirm.emit(this._selectedItems);
    this.closeModal();
  }

  onPageChange({ current, pageSize }) {
    this.dataService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, ({ goods, currentPagination, propertyName1, propertyName2 }) => {
      this.bindTable(goods, currentPagination, propertyName1, propertyName2);
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
  }

  onCategoryChange(selected) {
    this.dataService.onCategoryChange(selected, ({ goods, currentPagination, propertyName1, propertyName2 }) => {
      this.bindTable(goods, currentPagination, propertyName1, propertyName2);
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
  }

  bindTable(goods, currentPagination, propertyName1, propertyName2) {
    goods = goods.map(item => ({
      ...item,
      Selected: this.isSelected(item),
      Quanlity: this.getQuanlity(item),
      CurrentPrice: this.getCurrentPrice(item)
    }));
    this.goods = goods;
    this.pagination = currentPagination;
    this.propertyName1 = propertyName1;
    this.propertyName2 = propertyName2;
  }

  onSearch(queryKey) {
    this.dataService.onSearch(queryKey, ({ goods, currentPagination, propertyName1, propertyName2 }) => {
      this.bindTable(goods, currentPagination, propertyName1, propertyName2);
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
    this._selectedItems = value || <any>[];
    this.dataService.list(({ goods, currentPagination, propertyName1, propertyName2 }) => {
      this.bindTable(goods, currentPagination, propertyName1, propertyName2);
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  handleChange(value) {
    this._selectedItems = value || <any>[];
    this.dataService.list(({ goods, currentPagination, propertyName1, propertyName2 }) => {
      this.bindTable(goods, currentPagination, propertyName1, propertyName2);
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定货品列表失败!' + err
      });
    });
    this.onChange(value);
  }
}
