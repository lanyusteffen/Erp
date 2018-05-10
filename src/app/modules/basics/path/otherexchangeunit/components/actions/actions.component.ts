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

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定往来单位列表失败!' + err
    });
  }

  onSearch(queryKey) {
    this.otherExchangeUnitService.onSearch(queryKey, (err) => {
      this.listErrorCallBack(err);
    });
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用往来单位',
      link: '/home/basics/otherexchangeunit/disabled',
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
               this.listErrorCallBack(err);
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
