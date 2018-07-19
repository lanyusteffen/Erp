import { Component, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '../../product.router';

@Component({
  selector: 'app-product-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class ProductActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private productService: ProductService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService,
    private router: Router
  ) { }

  show() {
    this._show = true;
    this.selectedId = 0;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用商品',
      link: '/products/product/disabled',
      outlet: 'products-product-disabled'
    });
    this.router.nagigate('/products/product/disabled');
  }

  onShowBarcode() {
    this.tabsService.create({
      name: '商品条形码',
      link: '/products/product/barcode',
      outlet: 'products-product-barcode'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.productService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Product, err);
    });
  }


  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Product, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
