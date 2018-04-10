import { Component, Input } from '@angular/core';
import { SupplierService } from '../../supplier.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-supplier-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class SupplierActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private supplierService: SupplierService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) {}

  show() {
    this.selectedId = 0;
    this._show = true;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用供应商',
      link: '/basics/supplier/disabled',
      outlet: 'basics-supplier-disabled'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.supplierService.onSearch(queryKey, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定供应商列表失败, ' + err
      });
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
                this.alertService.open({
                  type: 'danger',
                  content: '绑定供应商列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '删除成功！'
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }
}
