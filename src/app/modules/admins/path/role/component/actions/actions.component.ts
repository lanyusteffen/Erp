import { Component, Input } from '@angular/core';
import { RoleService } from '../../role.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '../../../../../../components/tabs/tabs.service';

@Component({
  selector: 'app-role-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class RoleActionsComponent {
  private _show = false;
  private selectedId: number;
  @Input() selectedItems = <any>[];
  @Input() category;

  constructor(
    private roleService: RoleService,
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
    this.selectedId = -1;
  }

  onSearch(queryKey) {
    this.roleService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    });
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用角色',
      link: '/home/admins/role/disabled',
      outlet: 'admins-role-disabled'
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.roleService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.roleService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Role, err);
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
