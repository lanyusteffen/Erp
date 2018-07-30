import { Component, Input } from '@angular/core';
import { OtherIncomeService } from '../../otherincome.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherincome-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class OtherIncomeActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private otherIncomeService: OtherIncomeService,
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
      name: '停用其他收入',
      link: '/finances/otherincome/disabled'
    });
    this.router.navigate(['/finances/otherincome/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.otherIncomeService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.otherIncomeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.otherIncomeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
