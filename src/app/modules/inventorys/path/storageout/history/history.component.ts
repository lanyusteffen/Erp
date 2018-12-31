import { Component, OnInit } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { AuditStatusPublic } from '@enums/audit.status.public';
import { StorageStatus } from '../../../enums/storage.status.public';
import { NavService } from '@components/navs/nav.service';
import { StorageOutService } from '../storageout.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-storageout-history',
  template: `
    <app-storageout-actions (onExecuteQuery)="onQuery($event)"></app-storageout-actions>
    <div class="content">
      <app-navs (onSelectedChange)="onNavChanged($event)"></app-navs>
      <app-storageout-list></app-storageout-list>
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
export class StorageOutHistoryComponent implements OnInit {

  private selectNav: any;

  constructor(private navService: NavService,
              private alertService: AlertService,
              private storageoutService: StorageOutService) {

  }

  onNavChanged(selected: NavItem) {
    this.selectNav = selected;
    this.storageoutService.onNavChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onQuery(queryItem: any) {
    this.storageoutService.onExecuteQuery(queryItem, (err) => {
      this.listErrorCallBack(err);
    });
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定出库订单列表失败!' + err
    });
  }

  ngOnInit() {
    this.initNavs();
  }

  initNavs() {
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '未审核',
      Code: 'UnAudit',
      AuditStatus: AuditStatusPublic.WaitAudit,
      BusinessStatus: null,
      IsSelected: false
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
      BusinessStatus: StorageStatus.PartialStorageOut,
      IsSelected: false
    });
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '全部入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: StorageStatus.AllStorageOut,
      IsSelected: false
    });
    this.navService.create({
      Status: StatusPublic.Valid,
      Name: '已终止',
      Code: 'Terminal',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: StorageStatus.Stoped,
      IsSelected: false
    });
  }
}
