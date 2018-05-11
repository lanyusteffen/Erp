import { Component, Input, OnInit } from '@angular/core';
import { CustomerPopupSelectorService } from './popup-selector-customer.service';

@Component({
  selector: 'app-popup-selector-client',
  templateUrl: './popup-selector-client.component.html',
  styleUrls: ['./popup-selector-client.component.less'],
  providers: [CustomerPopupSelectorService]
})

export class CustomerPopupSelectorComponent implements OnInit {
  private show = false;

  constructor(
    private dataService: CustomerPopupSelectorService
  ) { }

  ngOnInit() { }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  showSupplier() {

  }

  showCustomer() {

  }

  showOther() {

  }
}
