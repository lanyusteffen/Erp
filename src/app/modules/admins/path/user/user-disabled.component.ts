import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-user-disabled',
  template: `
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称、手机号、联系人查询'" (onSearch)="onSearchDisabled($event)"></app-quick-search>
    <app-ui-button [style]="'danger'" [disabled]="!selectedItems.length" (click)="restore()">
        <i class="iconfont icon-delete"></i>
        还原
    </app-ui-button>
    <app-ui-button *ngIf="!systemConfig.IsOpenBill" [style]="'danger'" [disabled]="!selectedItems.length" (click)="delete()">
        <i class="iconfont icon-delete"></i>
        删除
    </app-ui-button>
    <div class="more">
    </div>
  </div>
  <div class="content">l
    <app-user-disabled-list (selectItems)="selectItems($event)"></app-user-disabled-list>
  </div>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      display: flex;
    }
  `]
})

export class UserDisabledComponent {
  private selectedItems = <any>[];

  constructor(
    private userService: UserService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) { }

  onSearch(queryKey) {
    this.loadingBar.start();
    this.userService.onSearchDisabled(queryKey, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    }, () => {
      this.loadingBar.complete();
    });
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  delete() {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.userService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.userService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.removeSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.removeFail(err);
          });
      }
    });
  }

  restore() {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.userService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.userService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.restoreSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.restoreFail(data.ErrorMessages);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
