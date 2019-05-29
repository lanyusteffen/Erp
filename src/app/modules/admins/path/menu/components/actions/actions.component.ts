import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
    private router: Router,
    private loadingBar: SlimLoadingBarService
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
    this.loadingBar.start();
    this.menuService.onSearch(queryKey, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
    }, () => {
      this.loadingBar.complete();
    });
  }

  onCancel() {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.menuService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.menuService.list((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Menu, err);
              }, () => {
                this.alertService.removeSuccess();
                this.loadingBar.complete();
              });
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
