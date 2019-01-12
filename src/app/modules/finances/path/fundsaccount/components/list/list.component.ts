import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FundsAccountService } from '../../fundsaccount.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-fundsaccount-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class FundsAccountListComponent implements OnInit, OnDestroy {
  private fundsAccounts = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private fundsAccountService: FundsAccountService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.fundsAccountService
      .get()
      .subscribe(({ fundsAccounts, currentPagination }) => {
        this.fundsAccounts = fundsAccounts;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.fundsAccountService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
      this.loadingBar.complete();
    },()=>{
      this.loadingBar.complete();
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
      this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  onCancel(id) {
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.fundsAccountService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.fundsAccountService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
              });
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }

  onRemove(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.fundsAccountService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.fundsAccountService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.FundsAccount, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
