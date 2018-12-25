import { Component, OnInit } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { AuditStatusPublic } from '@enums/audit.status.public';
import { PurchaseOrderStatus } from '../../../enums/purchase.status.public';

@Component({
  selector: 'app-purchase-history',
  template: `
    <app-purchase-actions ></app-purchase-actions>
    <div class="content">
      <app-navs
        [navItems]="navItems"
      >
      </app-navs>
      <app-purchase-list></app-purchase-list>
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
  `]
})
export class PurchaseHistoryComponent implements OnInit {

  private navItems: NavItem[];

  constructor() { }

  ngOnInit() {
    this.initNavs();
  }

  initNavs() {
    const draftNav = {
      Status: StatusPublic.Valid,
      Name: '草稿',
      Code: 'Draft',
      AuditStatus: AuditStatusPublic.WaitAudit,
      BusinessStauts: PurchaseOrderStatus.Draft,
      IsSelected: false
    };
    const unAuditNav = {
      Status: StatusPublic.Valid,
      Name: '未审核',
      Code: 'UnAudit',
      AuditStatus: AuditStatusPublic.WaitAudit,
      BusinessStauts: null,
      IsSelected: false
    };
    const auditedNav = {
      Status: StatusPublic.Valid,
      Name: '已审核',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStauts: null,
      IsSelected: false
    };
    const partInNav = {
      Status: StatusPublic.Valid,
      Name: '部分入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStauts: PurchaseOrderStatus.PartialPurchaseIn,
      IsSelected: false
    };
    const allInNav = {
      Status: StatusPublic.Valid,
      Name: '全部入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStauts: PurchaseOrderStatus.AllPurchaseIn,
      IsSelected: false
    };
    const terminalNav = {
      Status: StatusPublic.Valid,
      Name: '已终止',
      Code: 'Terminal',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStauts: PurchaseOrderStatus.Stoped,
      IsSelected: false
    };
    this.navItems = new Array( unAuditNav, auditedNav, partInNav, allInNav, terminalNav );
  }
}
