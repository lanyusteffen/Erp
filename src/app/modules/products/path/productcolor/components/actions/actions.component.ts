import { Component, Input } from '@angular/core';
import { ProductColorService } from '../../productcolor.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productcolor-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class ProductColorActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private productColorService: ProductColorService,
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
      name: '停用商品颜色',
      link: '/products/productcolor/disabled'
    });
    this.router.navigate(['/products/productcolor/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.productColorService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productColorService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productColorService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
