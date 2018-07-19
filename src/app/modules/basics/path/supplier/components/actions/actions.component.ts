import { Component, Input } from '@angular/core';
import { SupplierService } from '../../supplier.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
  selector: 'app-supplier-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class SupplierActionsComponent {
  private _show = false;
  private selectedId: number;
  private _category: any;
  private selectCategory: any;

  @Input() selectedItems = <any>[];

  @Input() set category(category) {
    this._category = category;
  }

  get category() {
      return this._category;
  }

  constructor(
    private supplierService: SupplierService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) {}

  show() {
    this.selectedId = 0;
    this.selectCategory = this.category;
    this._show = true;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用供应商',
      link: '/basics/supplier/disabled'
    });
  }

  close() {
    this._show = false;
    this.selectedId = -1;
  }

  onSearch(queryKey) {
    this.supplierService.onSearch(queryKey, (err) => {
     this.alertService.listErrorCallBack(ModuleName.Supplier, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.supplierService
          .cancel(this.selectedItems.map(item => item.Id), ({ IsValid, ErrorMessages }) => {
            if (IsValid) {
              this.supplierService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Supplier, err);
              }, () => {
                this.alertService.removeSuccess();
              });
            } else {
              this.alertService.removeFail(ErrorMessages);
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
