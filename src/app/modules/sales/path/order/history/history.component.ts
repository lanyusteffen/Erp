import { Component, OnInit, ViewChild } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { AuditStatusPublic } from '@enums/audit.status.public';
import { SalesOrderStatus } from '../../../enums/sale.status.public';
import { SalesService } from '../order.service';
import { AlertService } from '@services/alert.service';
import { DatePipe } from '@angular/common';
import { SaleListComponent } from './list/list.component';
import { SaleActionsComponent } from './actions/actions.component';
import { NavsComponent } from '@components/navs/navs.component';

@Component({
  selector: 'app-sale-history',
  template: `
    <app-sale-actions [selectedItems]="selectedItems" (onExecuteQuery)="onQuery($event)"></app-sale-actions>
    <div class="content">
      <app-navs (onSelectedChange)="onNavChanged($event)"></app-navs>
      <app-sale-list (selectItems)="selectItems($event)"></app-sale-list>
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
    DatePipe
  ]
})
export class SaleHistoryComponent implements OnInit {

  private selectNav: NavItem;

  @ViewChild(SaleListComponent)
  private saleList: SaleListComponent;

  @ViewChild(SaleActionsComponent)
  private saleListAction: SaleActionsComponent;

  @ViewChild(NavsComponent)
  private navBar: NavsComponent;

  constructor(private alertService: AlertService,
              private datePipe: DatePipe,
              private saleService: SalesService) {
  }

  onNavChanged(selected: NavItem) {
    this.selectNav = selected;
    this.saleList.selectNav = selected;
    this.saleListAction.selectNav = selected;
    this.saleService.onNavChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onQuery(queryItem: any) {
    queryItem.BeginDate = this.datePipe.transform(<Date>queryItem.BeginDate, 'yyyy-MM-dd HH:mm:ss');
    queryItem.EndDate = this.datePipe.transform(<Date>queryItem.EndDate, 'yyyy-MM-dd HH:mm:ss');
    this.saleService.onExecuteQuery(queryItem, (err) => {
      this.listErrorCallBack(err);
    });
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定采购订单列表失败!' + err
    });
  }

  ngOnInit() {
    this.initNavs();
    this.selectNav = this.navBar.all()[0];
    this.saleList.selectNav = this.navBar.all()[0];
    this.saleListAction.selectNav = this.navBar.all()[0];
  }

  initNavs() {
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '未审核',
      Code: 'UnAudit',
      AuditStatus: AuditStatusPublic.WaitAudit,
      BusinessStatus: null,
      IsSelected: true
    });
    this.navBar.create( {
      Status: StatusPublic.Valid,
      Name: '已审核',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: null,
      IsSelected: false
    });
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '部分出库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: SalesOrderStatus.PartialSalesOut,
      IsSelected: false
    });
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '全部出库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: SalesOrderStatus.AllSalesOut,
      IsSelected: false
    });
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '已终止',
      Code: 'Terminal',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: SalesOrderStatus.Stoped,
      IsSelected: false
    });
  }
}
