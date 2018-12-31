import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StorageOutService } from '../../storageout.service';
import { DatePipe } from '@angular/common';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-storageout-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [ AppService, DatePipe ]
})
export class StorageOutListComponent implements OnInit, OnDestroy {

  private storageOuts = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private storageOutOrderService: StorageOutService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService,
    private datePipe: DatePipe
  ) {
    this.loadingBar.start();
    this.subscription = this.storageOutOrderService
      .get()
      .subscribe(({ storageOuts, currentPagination }) => {
        this.storageOuts = storageOuts.map(item => ({
          ...item,
          StorageOutTime: this.datePipe.transform(<Date>item.StorageOutTime, 'yyyy-MM-dd')
        }));
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.getSystemConfig();
    this.storageOutOrderService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
      this.loadingBar.complete();
    }, () => {
      this.loadingBar.complete();
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
    this.storageOuts = this.storageOuts.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.storageOuts : []);

  }

  select(evt, selectedItem) {
    this.storageOuts = this.storageOuts.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.storageOuts.every(item => item.selected);
    this.selectItems.emit(this.storageOuts.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.storageOutOrderService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
    });
  }

  update(id) {
    this.selectedId = id;
  }

  onCancel(id) {
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.storageOutOrderService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.storageOutOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
              });
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
