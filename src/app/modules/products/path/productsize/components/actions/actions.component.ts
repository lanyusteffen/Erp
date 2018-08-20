import { Component, Input } from '@angular/core';
import { ProductSizeService } from '../../productsize.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productsize-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class ProductSizeActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private productSizeService: ProductSizeService,
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
      name: '停用商品尺寸',
      link: '/products/productsize/disabled'
    });
	this.router.navigate(['/products/productsize/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.productSizeService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productSizeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productSizeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
