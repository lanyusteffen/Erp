import { Component, Input } from '@angular/core';
import { OtherExchangeUnitService } from '../../other-exchange-unit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-otherexchangeunit-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class OtherExchangeUnitActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
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
    this.otherExchangeUnitService.onSearch(queryKey);
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用往来单位',
      link: '/basics/otherexchangeunit/disabled',
      outlet: 'basics-otherexchangeunit-disabled'
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.otherExchangeUnitService
          .cancel(this.selectedItems.map(item => item.Id))
          .subscribe(data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.otherExchangeUnitService.list();
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
