import { Component, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

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
	private router: Router
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
    this.userService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.User, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.userService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.userService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.User, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
