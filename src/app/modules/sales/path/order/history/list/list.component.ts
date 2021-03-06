import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SalesService } from '../../order.service';
import { DatePipe } from '@angular/common';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';
import { NavItem } from '@contracts/nav.item';
import { Router } from '@angular/router';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [ AppService, DatePipe ]
})
export class SaleListComponent implements OnInit, OnDestroy {

  private sales = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showItem = false;
  private subscription: Subscription;
  private propertyName1 = null;
  private propertyName2 = null;
  private currentSale = <any>[];

  @LocalStorage()
  private systemConfig: any;

  @LocalStorage()
  private productConfig: any;

  @Input()
  selectNav: NavItem;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private saleOrderService: SalesService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService,
    private datePipe: DatePipe,
    private router: Router,
    private tabService: TabsService
  ) {
    this.loadingBar.start();
    this.subscription = this.saleOrderService
      .get()
      .subscribe(({ sales, currentPagination }) => {
        console.log(sales);
        this.sales = sales.map(item => ({
          ...item,
          SaleTime: this.datePipe.transform(<Date>item.SaleTime, 'yyyy-MM-dd')
        }));
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.getSystemConfig();
    this.getProductConfig();
    this.saleOrderService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Sale, err);
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
    this.sales = this.sales.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.sales : []);
  }

  select(evt, selectedItem) {
    this.sales = this.sales.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.sales.every(item => item.selected);
    this.selectItems.emit(this.sales.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.saleOrderService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Sale, err);
    });
  }

  cancel(item) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.saleOrderService
          .cancel([item.Id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.saleOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Sale, err);
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
    this.currentSale = item;
  }

  audit(item) {
    this.confirmService.open({
      content: '确认审核吗？',
      onConfirm: () => {
        this.saleOrderService
          .audit([item.Id], data => {
            if (data.IsValid) {
              this.alertService.auditSuccess();
              this.saleOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Sale, err);
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
        this.saleOrderService
          .unAudit([item.Id], data => {
            if (data.IsValid) {
              this.alertService.unAuditSuccess();
              this.saleOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Sale, err);
              });
            }
          }, (err) => {
            this.alertService.unAuditFail(err);
          });
      }
    });
  }

  copy(item) {
    const link = '/sales/order';
    const paras = { type: 'copy', id: item.Id };
    this.tabService.create({
      name: '复制采购订单',
      link: link,
      paras: paras
    });
    this.router.navigate([link], {queryParams: paras, skipLocationChange: true });
  }

  edit(item) {
    const link = '/sales/order';
    const paras = { type: 'edit', id: item.Id };
    this.tabService.create({
      name: '修改采购订单',
      link: link,
      paras: paras
    });
    this.router.navigate([link], {queryParams: paras, skipLocationChange: true });
  }

  storageIn(item) {
    
  }

  closeItem() {
    this._showItem = false;
  }
}
