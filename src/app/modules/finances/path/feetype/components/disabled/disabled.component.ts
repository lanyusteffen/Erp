import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FeeTypeService } from '../../feetype.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-feetype-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class FeeTypeDisabledListComponent implements OnInit, OnDestroy {
  private feeTypes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private feeTypeService: FeeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.feeTypeService
      .get()
      .subscribe(({ feeTypes, currentPagination }) => {
        this.feeTypes = feeTypes;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    this.appService.getSystemConfig((data) => {
      this.systemConfig = data;
      this.feeTypeService.listDisabled((err) => {
        this.alertService.listErrorCallBack(ModuleName.Cancel, err);
      });
    }, (err) => {
      this.alertService.systemConfigFail(err);
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
    this.feeTypes = this.feeTypes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.feeTypes : []);

  }

  select(evt, selectedItem) {
    this.feeTypes = this.feeTypes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.feeTypes.every(item => item.selected);
    this.selectItems.emit(this.feeTypes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.feeTypeService.onPageChangeDisabled({
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
        this.feeTypeService
          .remove([id], data => {
            if (data.IsValid) {
              this.feeTypeService.listDisabled((err) => {
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
        this.feeTypeService
          .restore([id], data => {
            if (data.IsValid) {
              this.feeTypeService.listDisabled((err) => {
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
