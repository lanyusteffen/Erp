import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-basics-customer',
  template: `
    <app-customer-actions [selectedItems]="selectedItems" [category]="category"></app-customer-actions>
    <div class="content">
      <app-category
        (onChange)="onCategoryChange($event)"
        [categoryType]="'Customer'"
        [resourceType]="'Customer'"
      ></app-category>
      <app-customer-list (selectItems)="selectItems($event)"></app-customer-list>
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

export class CustomerComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private category;
  private subscription: Subscription;

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.subscription = this.customerService
      .get()
      .subscribe(({ currentCategory }) => {
        this.category = currentCategory;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  onCategoryChange(selected) {
    this.customerService.onCategoryChange(selected);
  }
}
