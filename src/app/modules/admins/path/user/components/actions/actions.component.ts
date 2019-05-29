import { Component, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-user-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class UserActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private userService: UserService,
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
      name: '停用用户',
      link: '/admins/user/disabled'
    });
    this.router.navigate(['/admins/user/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.loadingBar.start();
    this.userService.onSearch(queryKey, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.User, err);
    }, () => {
      this.loadingBar.complete();
    });
  }

  onCancel() {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.userService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.userService.list((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.User, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.removeSuccess();
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
