import { Component, Input } from '@angular/core';
import { IncomeTypeService } from '../../incometype.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-incometype-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class IncomeTypeActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];

  constructor(
    private incomeTypeService: IncomeTypeService,
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
      name: '停用收入类型',
      link: '/finances/incometype/disabled',
      outlet: 'finances-incometype-disabled'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.incomeTypeService.onSearch(queryKey);
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.incomeTypeService
          .cancel(this.selectedItems.map(item => item.Id))
          .subscribe(data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.incomeTypeService.list();
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          });
      }
    });
  }
}
