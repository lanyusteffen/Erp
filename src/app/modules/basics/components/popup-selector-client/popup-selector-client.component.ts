import { Component, Input, OnInit, Output } from '@angular/core';
import { CustomerPopupSelectorService } from './popup-selector-customer.service';
import { LocalStorage } from 'ngx-webstorage';

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

  @Output()
  get selectedValue() {
    return 0;
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

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
