import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductConfigService } from './productconfig.service';

@Component({
  selector: 'app-product-productconfig',
  template: `
    <div class="content">
      <app-productconfig-control></app-productconfig-control>
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

export class ProductConfigComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private productConfigService: ProductConfigService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
