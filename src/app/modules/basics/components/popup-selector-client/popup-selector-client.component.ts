import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerPopupSelectorService } from './popup-selector-customer.service';
import { LocalStorage } from 'ngx-webstorage';
import { FactoryOrValue } from 'rxjs/interfaces';
import { PopupSelectorCustomerComponent } from '../popup-selector-customer/popup-selector-customer.component';
import { PopupSelectorSupplierComponent } from '../popup-selector-supplier/popup-selector-supplier.component';
import { PopupSelectorOtherComponent } from '../popup-selector-other/popup-selector-other.component';

@Component({
  selector: 'app-popup-selector-client',
  templateUrl: './popup-selector-client.component.html',
  styleUrls: ['./popup-selector-client.component.less'],
  providers: [CustomerPopupSelectorService]
})

export class CustomerPopupSelectorComponent implements OnInit {
  @LocalStorage()
  selectedTab: string;
  show = false;
  @Input()
  set defaultTab(value) {
    if (value !== null && value !== undefined) {
      this.selectTab(value);
    }
  }

  _showLabel = '';

  @Output() onConfirm = new EventEmitter<any>();

   // 获取模板内的第一个指定组件
   @ViewChild(PopupSelectorCustomerComponent)
   private popupSelectorCustomer: PopupSelectorCustomerComponent;

   @ViewChild(PopupSelectorSupplierComponent)
   private popupSelectorSupplier: PopupSelectorSupplierComponent;

   @ViewChild(PopupSelectorOtherComponent)
   private popupSelectorOther: PopupSelectorOtherComponent;

  _isMultiSelect = false;

  @Input()
  set isMultiSelect(value) {
    this._isMultiSelect = value;
  }

  get isMultiSelect() {
    return this._isMultiSelect;
  }

  selectChanged(label: string) {
    this._showLabel = label;
  }

  @Output()
  get selectedValue() {
    if (this.selectedTab === 'Supplier') {
      return this.popupSelectorSupplier.selectedValue;
    } else if (this.selectedTab === 'Customer') {
      return this.popupSelectorCustomer.selectedValue;
    } else if (this.selectedTab === 'Other') {
      return this.popupSelectorOther.selectedValue;
    } else {
      return null;
    }
  }

  @Output()
  get selectedItem() {
    if (this.selectedTab === 'Supplier') {
      return this.popupSelectorSupplier.selectedItem;
    } else if (this.selectedTab === 'Customer') {
      return this.popupSelectorCustomer.selectedItem;
    } else if (this.selectedTab === 'Other') {
      return this.popupSelectorOther.selectedItem;
    } else {
      return null;
    }
  }

  constructor(
    private dataService: CustomerPopupSelectorService
  ) {
    if (this.selectedTab === null || this.selectedTab === undefined) {
      this.selectTab('Supplier');
    }
  }

  isActive(tab: string): string {
    if (tab === this.selectedTab) {
      return 'active';
    }
    return '';
  }

  ngOnInit() { }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  confirm() {
    this.onConfirm.emit(this.selectedItem);
    this.closeModal();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
