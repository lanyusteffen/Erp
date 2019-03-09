import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationService } from './operation.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-operation-disabled',
  template: `
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称查询'" (onSearch)="onSearchDisabled($event)"></app-quick-search>
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
    <app-operation-disabled-list (selectItems)="selectItems($event)"></app-operation-disabled-list>
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
  `],
  providers: [
    AppService
  ]
})

export class OperationDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private operationService: OperationService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.systemConfig = this.getSystemConfig();
  }

  onSearch(queryKey) {
    this.operationService.onSearchDisabled(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      }, (err) => {
        this.alertService.systemConfigFail(err);
      });
    }
    return this.systemConfig;
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.operationService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.operationService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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

  restore() {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.operationService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.operationService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              }, () => {
                this.alertService.restoreSuccess();
              });
            } else {
              this.alertService.restoreFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
