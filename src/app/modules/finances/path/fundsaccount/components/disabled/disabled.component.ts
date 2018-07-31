import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FundsAccountService } from '../../fundsaccount.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-fundsaccount-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class FundsAccountDisabledListComponent implements OnInit, OnDestroy {
  private fundsAccounts = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  @LocalStorage()
  systemConfig: any;

  constructor(
    private fundsAccountService: FundsAccountService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.fundsAccountService
      .get()
      .subscribe(({ fundsAccounts, currentPagination }) => {
        this.fundsAccounts = fundsAccounts;
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
    this.fundsAccountService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.fundsAccounts = this.fundsAccounts.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.fundsAccounts : []);

  }

  select(evt, selectedItem) {
    this.fundsAccounts = this.fundsAccounts.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.fundsAccounts.every(item => item.selected);
    this.selectItems.emit(this.fundsAccounts.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.fundsAccountService.onPageChange({
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
        this.fundsAccountService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.fundsAccountService.listDisabled((err) => {
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
        this.fundsAccountService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.fundsAccountService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
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
