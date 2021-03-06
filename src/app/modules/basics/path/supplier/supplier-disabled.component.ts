import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplierService } from './supplier.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-supplier-disabled',
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
        [resourceType]="'Supplier'"
    ></app-category>
    <app-supplier-disabled-list (selectItems)="selectItems($event)"></app-supplier-disabled-list>
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

export class SupplierDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private category;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private supplierService: SupplierService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.systemConfig = this.getSystemConfig();
    this.subscription = this.supplierService
      .get()
      .subscribe(({ currentCategory }) => {
        this.category = currentCategory;
      });
  }

  onSearch(queryKey) {
    this.supplierService.onSearchDisabled(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onCategoryChange(selected) {
    this.supplierService.onCategoryChangeDisabled(selected, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.supplierService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.supplierService.listDisabled((err) => {
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
        this.supplierService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.supplierService.listDisabled((err) => {
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
