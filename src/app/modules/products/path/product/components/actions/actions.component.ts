import { Component, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';

import { TabsService } from '@components/tabs/tabs.service';

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
    private tabsService: TabsService
  ) { }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定商品列表失败!' + err
    });
  }

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
      this.listErrorCallBack(err);
    });
  }


  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.productService.list((err) => {
                this.listErrorCallBack(err);
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'daner',
              content: '删除失败！' + err
            });
          });
      }
    });
  }
}
