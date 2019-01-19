import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PurchaseService } from '../../order.service';
import { DatePipe } from '@angular/common';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';
import { NavItem } from '@contracts/nav.item';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [ AppService, DatePipe ]
})
export class PurchaseListComponent implements OnInit, OnDestroy {

  private purchases = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showItem = false;
  private subscription: Subscription;
  private propertyName1 = null;
  private propertyName2 = null;
  private currentPurchase = <any>[];

  @LocalStorage()
  private systemConfig: any;

  @LocalStorage()
  private productConfig: any;

  @Input()
  selectNav: NavItem;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private purchaseOrderService: PurchaseService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService,
    private datePipe: DatePipe
  ) {
    this.loadingBar.start();
    this.subscription = this.purchaseOrderService
      .get()
      .subscribe(({ purchases, currentPagination }) => {
        this.purchases = purchases.map(item => ({
          ...item,
          PurchaseTime: this.datePipe.transform(<Date>item.PurchaseTime, 'yyyy-MM-dd')
        }));
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.getSystemConfig();
    this.getProductConfig();
    this.purchaseOrderService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Purchase, err);
      this.loadingBar.complete();
    }, () => {
      this.loadingBar.complete();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProductConfig(): any {
    if (!this.productConfig) {
      this.appService.getProductConfig((data) => {
        this.productConfig = data;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '获取系统配置失败' + err
        });
      });
    }
    this.propertyName1 = this.productConfig.PropertyName1;
    this.propertyName2 = this.productConfig.PropertyName2;
    return this.productConfig;
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

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.purchases = this.purchases.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.purchases : []);
  }

  select(evt, selectedItem) {
    this.purchases = this.purchases.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.purchases.every(item => item.selected);
    this.selectItems.emit(this.purchases.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.purchaseOrderService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Purchase, err);
    });
  }

  update(item) {
    this.selectedId = item.Id;
  }

  cancel(item) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.purchaseOrderService
          .cancel([item.Id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.purchaseOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Purchase, err);
              });
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }

  showItem(item) {
    this._showItem = true;
    this.currentPurchase = item;
  }

  audit(item) {
    this.confirmService.open({
      content: '确认审核吗？',
      onConfirm: () => {
        this.purchaseOrderService
          .audit([item.Id], data => {
            if (data.IsValid) {
              this.alertService.auditSuccess();
              this.purchaseOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Purchase, err);
              });
            }
          }, (err) => {
            this.alertService.auditFail(err);
          });
      }
    });
  }

  unAudit(item) {
    this.confirmService.open({
      content: '确认反审核吗？',
      onConfirm: () => {
        this.purchaseOrderService
          .unAudit([item.Id], data => {
            if (data.IsValid) {
              this.alertService.unAuditSuccess();
              this.purchaseOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Purchase, err);
              });
            }
          }, (err) => {
            this.alertService.unAuditFail(err);
          });
      }
    });
  }

  copy(item) {

  }

  storageIn(item) {
    
  }

  closeItem() {
    this._showItem = false;
  }
}
