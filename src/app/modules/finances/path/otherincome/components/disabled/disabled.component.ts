import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OtherIncomeService } from '../../otherincome.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-otherincome-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class OtherIncomeDisabledListComponent implements OnInit, OnDestroy {
  private otherIncomes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private otherIncomeService: OtherIncomeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.otherIncomeService
      .get()
      .subscribe(({ otherIncomes, currentPagination }) => {
        this.otherIncomes = otherIncomes;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    this.appService.getSystemConfig((data) => {
      this.systemConfig = data;
      this.otherIncomeService.listDisabled((err) => {
        this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
    this.otherIncomes = this.otherIncomes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.otherIncomes : []);

  }

  select(evt, selectedItem) {
    this.otherIncomes = this.otherIncomes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.otherIncomes.every(item => item.selected);
    this.selectItems.emit(this.otherIncomes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.otherIncomeService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.otherIncomeService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.otherIncomeService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
        this.otherIncomeService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.otherIncomeService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
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
