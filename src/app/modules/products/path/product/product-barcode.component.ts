import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { AlertService } from '@services/alert.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-products-product-barcode',
  template: `
  <div class="actions">
    <app-quick-search [placeholder]="'输入商品编号、名称、规格型号、品牌'" (onSearch)="onSearch($event)"></app-quick-search>
  </div>
  <div class="content">
    <app-product-barcode-list></app-product-barcode-list>
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

export class ProductBarcodeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;


  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {
  }

  ngOnInit() {
    this.subscription = this.productService
      .get()
      .subscribe();
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定商品条形码列表失败!' + err
    });
  }

  onSearch(queryKey) {
    this.productService.onSearchBarcode(queryKey, (err) => {
      this.listErrorCallBack(err);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
