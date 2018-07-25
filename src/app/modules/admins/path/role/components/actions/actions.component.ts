import { Component, Input } from '@angular/core';
import { RoleService } from '../../role.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class RoleActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private roleService: RoleService,
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
      name: '停用角色',
      link: '/admins/role/disabled'
    });
	this.router.navigate(['/admins/role/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.roleService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.roleService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.roleService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Role, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
