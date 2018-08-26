import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductUnitService } from './productunit.service';

@Component({
  selector: 'app-finances-productunit',
  template: `
    <app-productunit-actions [selectedItems]="selectedItems"></app-productunit-actions>
    <div class="content">
      <app-productunit-list (selectItems)="selectItems($event)"></app-productunit-list>
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

export class ProductUnitComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private productUnitService: ProductUnitService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
