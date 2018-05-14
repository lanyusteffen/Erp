import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-purchase-order-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})

export class PurchaseOrderNewComponent implements OnInit, OnDestroy {

  private selectedCustomer: any;

  constructor(
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectCustomer(item: any): void {
    this.selectCustomer = item;
  }
}
