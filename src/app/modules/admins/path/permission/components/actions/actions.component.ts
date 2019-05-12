import { Component, Input } from '@angular/core';
import { PermissionService } from '../../permission.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})
export class PermissionActionsComponent {

  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private permissionService: PermissionService,
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
      name: '停用目录',
      link: '/admins/permission/disabled'
    });
    this.router.navigate(['/admins/permission/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.permissionService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Permission, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.permissionService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.permissionService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Menu, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
