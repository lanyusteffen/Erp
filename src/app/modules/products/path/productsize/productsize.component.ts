import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSizeService } from './productsize.service';

@Component({
  selector: 'app-finances-productsize',
  template: `
    <app-productsize-actions [selectedItems]="selectedItems"></app-productsize-actions>
    <div class="content">
      <app-productsize-list (selectItems)="selectItems($event)"></app-productsize-list>
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

export class ProductSizeComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private productSizeService: ProductSizeService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
