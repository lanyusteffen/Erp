import { Component, Input } from '@angular/core';
import { FundsAccountService } from '../../fundsaccount.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fundsaccount-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class FundsAccountActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private fundsAccountService: FundsAccountService,
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
      name: '停用银行账户',
      link: '/finances/fundsaccount/disabled'
    });
    this.router.navigate(['/finances/fundsaccount/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.fundsAccountService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.fundsAccountService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.fundsAccountService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
