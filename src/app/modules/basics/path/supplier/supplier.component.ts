import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'app-basics-supplier',
  template: `
    <app-supplier-actions [selectedItems]="selectedItems" [category]="category"></app-supplier-actions>
    <div class="content">
      <app-category
        [categoryType]="'Customer'"
        [resourceType]="'Supplier'"
        (onChange)="onCategoryChange($event)"
      ></app-category>
      <app-supplier-list (selectItems)="selectItems($event)"></app-supplier-list>
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

export class SupplierComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private category;
  private subscription: Subscription;

  constructor(
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.subscription = this.supplierService
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
    this.supplierService.onCategoryChange(selected);
  }
}
