import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtherExchangeUnitService } from './other-exchange-unit.service';

@Component({
  selector: 'app-basics-otherexchangeunit',
  template: `
    <app-otherexchangeunit-actions [selectedItems]="selectedItems" [category]="category"></app-otherexchangeunit-actions>
    <div class="content">
      <app-category (onChange)="onCategoryChange($event)"  
        [categoryType]="'Customer'"
        [resourceType]="'Other'"
      ></app-category>
      <app-otherexchangeunit-list (selectItems)="selectItems($event)"></app-otherexchangeunit-list>
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

export class OtherExchangeUnitComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private category;
  private subscription: Subscription;

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService
  ) {}

  ngOnInit() {
    this.subscription = this.otherExchangeUnitService
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
    this.otherExchangeUnitService.onCategoryChange(selected);
  }
}
