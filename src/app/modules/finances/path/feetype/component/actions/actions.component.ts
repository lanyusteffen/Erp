import { Component, Input } from '@angular/core';
import { FeeTypeService } from '../../feetype.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-feetype-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class FeeTypeActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private feeTypeService: FeeTypeService,
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
    this.feeTypeService.onSearch(queryKey, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定费用类型列表失败, ' + err
      });
    });
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用费用类型',
      link: '/finances/feetype/disabled',
      outlet: 'finances-feetype-disabled'
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.feeTypeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.feeTypeService.list((err) => {
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
