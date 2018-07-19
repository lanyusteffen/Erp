import { Component, Input } from '@angular/core';
import { OtherExchangeUnitService } from '../../other-exchange-unit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
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
  @Input() selectCategory:any;

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) { }

  show() {
    this.selectedId = 0;
    this.selectCategory = this.category;
    this._show = true;
  }

  close() {
    this._show = false;
    this.selectedId =-1;
  }


  onSearch(queryKey) {
    this.otherExchangeUnitService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.OtherExchangeUnit, err);
    });
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
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.OtherExchangeUnit, err);
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
