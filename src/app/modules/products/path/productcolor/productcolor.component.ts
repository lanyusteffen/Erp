import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductColorService } from './productcolor.service';

@Component({
  selector: 'app-finances-productcolor',
  template: `
    <app-productcolor-actions [selectedItems]="selectedItems"></app-productcolor-actions>
    <div class="content">
      <app-productcolor-list (selectItems)="selectItems($event)"></app-productcolor-list>
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

export class ProductColorComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private productColorService: ProductColorService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
