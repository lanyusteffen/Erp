import { Component, Input } from '@angular/core';
import { IncomeTypeService } from '../../incometype.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
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
      link: '/home/finances/incometype/disabled',
      outlet: 'finances-incometype-disabled'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.incomeTypeService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.IncomeType, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.incomeTypeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.incomeTypeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.IncomeType, err);
              }, () => {
                this.alertService.removeSuccess();
              });
            } else {
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
