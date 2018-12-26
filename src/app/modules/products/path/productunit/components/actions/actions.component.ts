import { Component, Input } from '@angular/core';
import { ProductUnitService } from '../../productunit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productunit-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class ProductUnitActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private productUnitService: ProductUnitService,
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
      name: '停用商品单位',
      link: '/products/productunit/disabled'
    });
	  this.router.navigate(['/products/productunit/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.productUnitService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productUnitService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
