import { Component, Input, OnInit } from '@angular/core';
import { CustomerPopupSelectorService } from './customer-popup-selector.service';

@Component({
  selector: 'app-customer-popup-selector',
  templateUrl: './customer-popup-selector.component.html',
  styleUrls: ['./customer-popup-selector.component.less'],
  providers: [CustomerPopupSelectorService]
})

export class CustomerPopupSelectorComponent implements OnInit {
  private show = false;

  constructor(
    private customerPopupSelectorService: CustomerPopupSelectorService
  ) { }

  ngOnInit() { }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

}
