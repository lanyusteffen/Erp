import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OperationService } from '../../operation.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-operation-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class OperationDisabledListComponent implements OnInit, OnDestroy {
  private operations = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private operationService: OperationService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.complete();
    this.subscription = this.operationService
      .getDisabled()
      .subscribe(({ operations, currentPagination }) => {
        this.operations = operations;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    this.appService.getSystemConfig((data) => {
      this.systemConfig = data;
      this.operationService.listDisabled((err) => {
       this.alertService.listErrorCallBack(ModuleName.Operation, err);
       this.loadingBar.complete();
      },()=>{
        this.loadingBar.complete();
      });
    }, (err) => {
      this.alertService.systemConfigFail(err);
      this.loadingBar.complete();
    });
    return this.systemConfig;
  }

  ngOnInit() {
    this.getSystemConfig();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.operations = this.operations.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.operations : []);

  }

  select(evt, selectedItem) {
    this.operations = this.operations.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.operations.every(item => item.selected);
    this.selectItems.emit(this.operations.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.operationService.onPageChangeDisabled({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.operationService
          .remove([id], data => {
            if (data.IsValid) {
              this.operationService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              }, () => {
                this.alertService.removeSuccess();
              });
            } else {
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.operationService
          .restore([id], data => {
            if (data.IsValid) {
              this.operationService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Operation, err);
              }, () => {
                this.alertService.restoreSuccess();
              });
            } else {
              this.alertService.restoreFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
