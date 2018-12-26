import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PurchaseService } from '../../order.service';
import { DatePipe } from '@angular/common';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';

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
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private purchaseOrderService: PurchaseService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private datePipe: DatePipe
  ) {
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
    this.purchaseOrderService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Purchase, err);
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

  update(id) {
    this.selectedId = id;
  }

  onCancel(id) {
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.purchaseOrderService
          .cancel([id], data => {
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
}
