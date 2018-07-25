import { Component, Input } from '@angular/core';
import { FeeTypeService } from '../../feeType.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
  selector: 'app-feetype-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class FeeTypeActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private feeTypeService: FeeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) { }

  show() {
    this._show = true;
    this.selectedId = 0;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用费用类型',
      link: '/finances/feetype/disabled'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.feeTypeService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.FeeType, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.feeTypeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.feeTypeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.FeeType, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
