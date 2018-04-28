import { Component, Input } from '@angular/core';
import { CompanyService } from '../../company.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-company-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class CompanyActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private companyService: CompanyService,
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

  onSearch(queryKey) {
    this.companyService.onSearch(queryKey, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定公司列表失败, ' + err
      });
    });
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用公司',
      link: '/admins/company/disabled',
      outlet: 'admins-company-disabled'
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.companyService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.companyService.list((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定费用类型列表失败, ' + err
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
