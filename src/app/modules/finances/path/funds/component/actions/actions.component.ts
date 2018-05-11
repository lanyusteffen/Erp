import { Component, Input } from '@angular/core';
import { FundsService } from '../../funds.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-funds-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class FundsActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private fundsService: FundsService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) { }

  show() {
    this.selectedId = 0;
    this._show = true;
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.fundsService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Funds, err);
    });
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用资金账户',
      link: '/home/finances/funds/disabled',
      outlet: 'finances-funds-disabled'
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.fundsService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.fundsService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Funds, err);
              }, () => {
                this.alertService.cancelSuccess();
              });
            } else {
              this.alertService.cancelFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
