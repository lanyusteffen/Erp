import { Component, Input } from '@angular/core';
import { AreaService } from '../../area.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';


@Component({
  selector: 'app-area-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class AreaActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private areaService: AreaService,
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
      name: '停用地区',
      link: '/basics/area/disabled',
      outlet: 'basics-area-disabled'
    });
  }

  close() {
    this._show = false;
  }


  onSearch(queryKey) {
    this.areaService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Area, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.areaService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.areaService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Area, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
