import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerPopupSelectorService } from './customer-popup-selector.service';
import { LocalStorage } from 'ngx-webstorage';
import { PopupSelectorCustomerComponent } from '../popup-selector-customer/popup-selector-customer.component';
import { PopupSelectorSupplierComponent } from '../popup-selector-supplier/popup-selector-supplier.component';
import { PopupSelectorOtherComponent } from '../popup-selector-other/popup-selector-other.component';

@Component({
  selector: 'app-customer-popup-selector',
  templateUrl: './customer-popup-selector.component.html',
  styleUrls: ['./customer-popup-selector.component.less'],
  providers: [CustomerPopupSelectorService]
})

export class CustomerPopupSelectorComponent {

  @LocalStorage()
  selectedTab: string;

  _show = false;
  _showLabel = '';

  @Input()
  set defaultTab(value) {
    if (value !== null && value !== undefined) {
      this.selectTab(value);
    }
  }

  @ViewChild(PopupSelectorCustomerComponent)
  private popupSelectorCustomer: PopupSelectorCustomerComponent;

  @ViewChild(PopupSelectorSupplierComponent)
  private popupSelectorSupplier: PopupSelectorSupplierComponent;

  @ViewChild(PopupSelectorOtherComponent)
  private popupSelectorOther: PopupSelectorOtherComponent;

  @Output() onConfirm = new EventEmitter<any>();

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

  selectChanged(label: string) {
    this._showLabel = label;
    this.onConfirm.emit(this.selectedItem);
    this.closeModal();
  }

  unSelect() {
    this._showLabel = '';
    this.popupSelectorCustomer.unSelect();
    this.popupSelectorOther.unSelect();
    this.popupSelectorSupplier.unSelect();
  }

  showModal() {
    this._show = true;
  }

  closeModal() {
    this._show = false;
  }

  confirm() {
    this._showLabel = this.selectedItem.Name;
    this.onConfirm.emit(this.selectedItem);
    this.closeModal();
  }

  onSearch(queryKey) {
    this.dataService.changeStateQueryKey(queryKey);
    if (this.selectedTab === 'Supplier') {
      this.popupSelectorSupplier.onSearch(queryKey);
    } else if (this.selectedTab === 'Customer') {
      this.popupSelectorCustomer.onSearch(queryKey);
    } else if (this.selectedTab === 'Other') {
      this.popupSelectorOther.onSearch(queryKey);
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  isActive(tab: string): string {
    if (tab === this.selectedTab) {
      return 'active';
    }
    return '';
  }

  constructor(
    private dataService: CustomerPopupSelectorService
  ) {
    if (this.selectedTab === null || this.selectedTab === undefined) {
      this.selectTab('Supplier');
    }
  }
}