import { Component } from '@angular/core';
import { RoleService } from './role.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-role-disabled',
  template: `
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称'" (onSearch)="onSearchDisabled($event)"></app-quick-search>
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
  <div class="content">
    <app-role-disabled-list (selectItems)="selectItems($event)"></app-role-disabled-list>
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

export class RoleDisabledComponent {
  private selectedItems = <any>[];

  constructor(
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
  }

  onSearch(queryKey) {
    this.loadingBar.start();
    this.roleService.onSearchDisabled(queryKey, (err) => {
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
        this.roleService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
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
        this.roleService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
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
