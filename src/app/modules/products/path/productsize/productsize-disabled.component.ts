import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSizeService } from './productsize.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-products-productsize-disabled',
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
    <app-productsize-disabled-list (selectItems)="selectItems($event)"></app-productsize-disabled-list>
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

export class ProductSizeDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private productSize;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private productSizeService: ProductSizeService,
    private alertService: AlertService,
    private appService: AppService,
    private confirmService: ConfirmService
  ) {
  }

  ngOnInit() {
    this.systemConfig = this.getSystemConfig();
    this.subscription = this.productSizeService
      .get()
      .subscribe();
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

  onSearch(queryKey) {
    this.productSizeService.onSearchDisabled(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
        this.productSizeService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.restoreSuccess();
              this.productSizeService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productSizeService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productSizeService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
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
}
