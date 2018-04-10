import { Component, Input } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-customer-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class CustomerActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private customerService: CustomerService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) {}

  show() {
    this.selectedId = 0;
    this._show = true;
  }

  close() {
    this._show = false;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用客户',
      link: '/basics/customer/disabled',
      outlet: 'basics-customer-disabled'
    });
  }

  onSearch(queryKey) {
    this.customerService.onSearch(queryKey, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定客户列表失败, ' + err
      });
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.customerService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.customerService.list((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定客户列表失败, ' + err
                }, () => {
                  this.alertService.open({
                    type: 'success',
                    content: '删除成功！'
                  });
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
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
