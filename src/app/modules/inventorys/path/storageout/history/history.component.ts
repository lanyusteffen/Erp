import { Component, OnInit, ViewChild } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { StatusPublic } from '@enums/status.public';
import { StorageStatus } from '../../../enums/storage.status.public';
import { NavService } from '@components/navs/nav.service';
import { StorageOutService } from '../storageout.service';
import { AlertService } from '@services/alert.service';
import { DatePipe } from '@angular/common';
import { StorageOutListComponent } from './list/list.component';
import { StorageOutActionsComponent } from './actions/actions.component';

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
  `],
  providers: [
    DatePipe
  ]
})
export class StorageOutHistoryComponent implements OnInit {

  private selectNav: any;

  constructor(private navService: NavService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private storageoutService: StorageOutService) {

  }

  @ViewChild(StorageOutListComponent)
  private storageOutList: StorageOutListComponent;

  @ViewChild(StorageOutActionsComponent)
  private storageOutAction: StorageOutActionsComponent;

  onNavChanged(selected: NavItem) {
    this.selectNav = selected;
    this.storageOutList.selectNav = selected;
    this.storageOutAction.selectNav = selected;
    this.storageoutService.onNavChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onQuery(queryItem: any) {
    queryItem.BeginDate = this.datePipe.transform(<Date>queryItem.BeginDate, 'yyyy-MM-dd HH:mm:ss');
    queryItem.EndDate = this.datePipe.transform(<Date>queryItem.EndDate, 'yyyy-MM-dd HH:mm:ss');
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
    this.selectNav = this.navService.all()[0];
    this.storageOutList.selectNav = this.navService.all()[0];
    this.storageOutAction.selectNav = this.navService.all()[0];
  }

  initNavs() {
    this.navService.create({
      Status: StorageStatus.Normal,
      Name: '未出库',
      Code: 'Normal',
      IsSelected: true
    });
    this.navService.create({
      Status: StorageStatus.PartialStorageOut,
      Name: '部分出库',
      Code: 'PartialStorageOut',
      IsSelected: false
    });
    this.navService.create({
      Status: StorageStatus.AllStorageOut,
      Name: '全部出库',
      Code: 'AllStorageOut',
      IsSelected: false
    });
    this.navService.create({
      Status: StorageStatus.Stoped,
      Name: '已终止',
      Code: 'Stoped',
      IsSelected: false
    });
  }
}
