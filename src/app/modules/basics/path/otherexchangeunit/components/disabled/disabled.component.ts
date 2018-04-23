import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OtherExchangeUnitService } from '../../other-exchange-unit.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-otherexchangeunit-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class OtherExchangeUnitDisabledListComponent implements OnInit, OnDestroy {
  private otherExchangeUnits = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.otherExchangeUnitService
      .get()
      .subscribe(({ otherExchangeUnits, currentPagination }) => {
        this.otherExchangeUnits = otherExchangeUnits;
        this.pagination = currentPagination;
      });
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

  ngOnInit() {
    this.getSystemConfig();
    this.otherExchangeUnitService.listDisabled((err) => {
      this.alertService.open({
        type: 'danger',
        content: '还原失败, ' + err
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.otherExchangeUnits = this.otherExchangeUnits.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.otherExchangeUnits : []);

  }

  select(evt, selectedItem) {
    this.otherExchangeUnits = this.otherExchangeUnits.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.otherExchangeUnits.every(item => item.selected);
    this.selectItems.emit(this.otherExchangeUnits.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.otherExchangeUnitService.onPageChangeDisabled({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定往来单位列表失败, ' + err
      });
    });
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.otherExchangeUnitService
          .remove([id], data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.listDisabled((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定往来单位列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '删除成功！'
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.otherExchangeUnitService
          .restore([id], data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.listDisabled((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定往来单位列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '还原成功！'
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '还原失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '还原失败, ' + err
            });
          });
      }
    });
  }
}
