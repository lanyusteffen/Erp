import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from './area.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-basics-area-disabled',
  template: `
  
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称'" (onSearch)="onSearch($event)"></app-quick-search>
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
    <app-area-disabled-list (selectItems)="selectItems($event)"></app-area-disabled-list>
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

export class AreaDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private area;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private areaService: AreaService,
    private alertService: AlertService,
    private appService: AppService,
    private confirmService: ConfirmService
  ) {
  }

  ngOnInit() {

    this.systemConfig = this.getSystemConfig();
    this.subscription = this.areaService
      .get()
      .subscribe();
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '获取系统配置失败' + err
        });
      });
    }
    return this.systemConfig;
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定停用地区列表失败!' + err
    });
  }

  onSearch(queryKey) {
    this.areaService.onSearchDisabled(queryKey, (err) => {
      this.listErrorCallBack(err);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  restore() {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.areaService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '还原成功！'
              });
              this.areaService.listDisabled((err) => {
                this.listErrorCallBack(err);
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '还原失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '还原失败, ' + err
            });
          });
      }
    });
  }

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.areaService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.areaService.listDisabled((err) => {
                this.listErrorCallBack(err);
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }

}
