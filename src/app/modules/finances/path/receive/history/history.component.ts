import { Component, OnInit, ViewChild } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { AuditStatusPublic } from '@enums/audit.status.public';
import { ReceiveStatus } from '../../enums/receive.status.public';
import { ReceiveService } from '../receive.service';
import { AlertService } from '@services/alert.service';
import { DatePipe } from '@angular/common';
import { ReceiveListComponent } from './list/list.component';
import { ReceiveActionsComponent } from './actions/actions.component';
import { NavsComponent } from '@components/navs/navs.component';

@Component({
  selector: 'app-receive-history',
  template: `
    <app-receive-actions [selectedItems]="selectedItems" (onExecuteQuery)="onQuery($event)"></app-receive-actions>
    <div class="content">
      <app-navs (onSelectedChange)="onNavChanged($event)"></app-navs>
      <app-receive-list (selectItems)="selectItems($event)"></app-receive-list>
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
export class ReceiveHistoryComponent implements OnInit {

  private selectNav: NavItem;

  @ViewChild(ReceiveListComponent)
  private receiveList: ReceiveListComponent;

  @ViewChild(ReceiveActionsComponent)
  private receiveListAction: ReceiveActionsComponent;

  @ViewChild(NavsComponent)
  private navBar: NavsComponent;

  constructor(private alertService: AlertService,
              private datePipe: DatePipe,
              private receiveService: ReceiveService) {
  }

  onNavChanged(selected: NavItem) {
    this.selectNav = selected;
    this.receiveList.selectNav = selected;
    this.receiveListAction.selectNav = selected;
    this.receiveService.onNavChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onQuery(queryItem: any) {
    queryItem.BeginDate = this.datePipe.transform(<Date>queryItem.BeginDate, 'yyyy-MM-dd HH:mm:ss');
    queryItem.EndDate = this.datePipe.transform(<Date>queryItem.EndDate, 'yyyy-MM-dd HH:mm:ss');
    this.receiveService.onExecuteQuery(queryItem, (err) => {
      this.listErrorCallBack(err);
    });
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定收款单列表失败!' + err
    });
  }

  ngOnInit() {
    this.initNavs();
    this.selectNav = this.navBar.all()[0];
    this.receiveList.selectNav = this.navBar.all()[0];
    this.receiveListAction.selectNav = this.navBar.all()[0];
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
      Name: '部分入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      // BusinessStatus: ReceiveStatus.,
      IsSelected: false
    });
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '全部入库',
      Code: 'Audited',
      AuditStatus: AuditStatusPublic.Approved,
      // BusinessStatus: ReceiveStatus.AllReceiveIn,
      IsSelected: false
    });
    this.navBar.create({
      Status: StatusPublic.Valid,
      Name: '已终止',
      Code: 'Terminal',
      AuditStatus: AuditStatusPublic.Approved,
      BusinessStatus: ReceiveStatus.Stoped,
      IsSelected: false
    });
  }
}
