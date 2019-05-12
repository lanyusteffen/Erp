import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class MenuActionsComponent {

  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private menuService: MenuService,
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
      link: '/admins/menu/disabled'
    });
    this.router.navigate(['/admins/menu/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.menuService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.menuService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.menuService.list((err) => {
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
