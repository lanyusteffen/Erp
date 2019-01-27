import { Component, OnInit, ViewChild } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { AuditStatusPublic } from '@enums/audit.status.public';
import { PurchaseOrderStatus } from '../../../enums/purchase.status.public';
import { NavService } from '@components/navs/nav.service';
import { PurchaseService } from '../order.service';
import { AlertService } from '@services/alert.service';
import { DatePipe } from '@angular/common';
import { PurchaseListComponent } from './list/list.component';
import { PurchaseActionsComponent } from './actions/actions.component';

@Component({
  selector: 'app-purchase-history',
  template: `
    <app-purchase-actions [selectedItems]="selectedItems" (onExecuteQuery)="onQuery($event)"></app-purchase-actions>
    <div class="content">
      <app-navs (onSelectedChange)="onNavChanged($event)"></app-navs>
      <app-purchase-list (selectItems)="selectItems($event)"></app-purchase-list>
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
export class PurchaseHistoryComponent implements OnInit {

  private selectNav: NavItem;

  @ViewChild(PurchaseListComponent)
  private purchaseList: PurchaseListComponent;

  @ViewChild(PurchaseActionsComponent)
  private purchaseListAction: PurchaseActionsComponent;

  constructor(private navService: NavService,
              private alertService: AlertService,
              private datePipe: DatePipe,
              private purchaseService: PurchaseService) {
  }

  onNavChanged(selected: NavItem) {
    this.selectNav = selected;
    this.purchaseList.selectNav = selected;
    this.purchaseListAction.selectNav = selected;
    this.purchaseService.onNavChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onQuery(queryItem: any) {
    queryItem.BeginDate = this.datePipe.transform(<Date>queryItem.BeginDate, 'yyyy-MM-dd HH:mm:ss');
    queryItem.EndDate = this.datePipe.transform(<Date>queryItem.EndDate, 'yyyy-MM-dd HH:mm:ss');
    this.purchaseService.onExecuteQuery(queryItem, (err) => {
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
    this.selectNav = this.navService.all()[0];
    this.purchaseList.selectNav = this.navService.all()[0];
    this.purchaseListAction.selectNav = this.navService.all()[0];
  }

  initNavs() {
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '未审核',
      Code: 'UnAudit',
      AuditStatus: AuditStatusPublic.WaitAudit,
      BusinessStatus: null,
      IsSelected: true
    });
    this.navService.create( {
      Status: StatusPublic.Valid,
      Name: '已审核',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: null,
      IsSelected: false
    });
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '部分入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: PurchaseOrderStatus.PartialPurchaseIn,
      IsSelected: false
    });
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '全部入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: PurchaseOrderStatus.AllPurchaseIn,
      IsSelected: false
    });
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '已终止',
      Code: 'Terminal',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: PurchaseOrderStatus.Stoped,
      IsSelected: false
    });
  }
}
