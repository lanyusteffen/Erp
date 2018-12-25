import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  template: `
    <app-purchase-actions ></app-purchase-actions>
    <div class="content">
      <app-navs></app-navs>
      <app-purchase-list></app-purchase-list>
    </div>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      display: flex;
    }
  `]
})
export class PurchaseHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
