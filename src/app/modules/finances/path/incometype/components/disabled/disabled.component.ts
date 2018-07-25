import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IncomeTypeService } from '../../incometype.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';

@Component({
  selector: 'app-incometype-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class IncomeTypeDisabledListComponent implements OnInit, OnDestroy {
  private incomeTypes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private incomeTypeService: IncomeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.incomeTypeService
      .get()
      .subscribe(({ incomeTypes, currentPagination }) => {
        this.incomeTypes = incomeTypes;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      }, (err) => {
        this.alertService.systemConfigFail(err);
      });
    }
    return this.systemConfig;
  }

  ngOnInit() {
    this.getSystemConfig();
    this.incomeTypeService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.incomeTypes = this.incomeTypes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.incomeTypes : []);

  }

  select(evt, selectedItem) {
    this.incomeTypes = this.incomeTypes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.incomeTypes.every(item => item.selected);
    this.selectItems.emit(this.incomeTypes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.incomeTypeService.onPageChangeDisabled({
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
        this.incomeTypeService
          .remove([id], data => {
            if (data.IsValid) {
              this.incomeTypeService.listDisabled((err) => {
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
        this.incomeTypeService
          .restore([id], data => {
            if (data.IsValid) {
              this.incomeTypeService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
