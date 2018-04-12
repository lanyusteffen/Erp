import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtherExchangeUnitService } from './other-exchange-unit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-otherexchnageunit-disabled',
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
  <div class="content">
    <app-category
        (onChange)="onCategoryChange($event)"
        [categoryType]="'Customer'"
        [resourceType]="'Other'"
    ></app-category>
    <app-otherexchangeunit-disabled-list (selectItems)="selectItems($event)"></app-otherexchangeunit-disabled-list>
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

export class OtherExchangeUnitDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private category;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.systemConfig = this.getSystemConfig();
    this.subscription = this.otherExchangeUnitService
      .get()
      .subscribe(({ currentCategory }) => {
        this.category = currentCategory;
      });
  }

  onSearch(queryKey) {
    this.otherExchangeUnitService.onSearchDisabled(queryKey, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定往来单位列表失败, ' + err
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      },(err)=>{
        this.alertService.open({
          type:'danger',
          content:'获取系统配置失败'+err
        });
      });
    }
    return this.systemConfig;
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  onCategoryChange(selected) {
    this.otherExchangeUnitService.onCategoryChangeDisabled(selected, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定往来单位列表失败, ' + err
      });
    });
  }

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.otherExchangeUnitService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.listDisabled((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定往来单位列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '删除成功！'
                });
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

  restore() {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.otherExchangeUnitService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.listDisabled((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定往来单位列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '还原成功！'
                });
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
}
