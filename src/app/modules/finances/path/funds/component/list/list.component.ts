import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FundsService } from '../../funds.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-funds-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class FundsListComponent implements OnInit, OnDestroy {
  private funds = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private fundsService: FundsService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.fundsService
      .get()
      .subscribe(({ funds, currentPagination }) => {
        this.funds = funds;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.fundsService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Funds, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.funds = this.funds.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.funds : []);

  }

  select(evt, selectedItem) {
    this.funds = this.funds.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.funds.every(item => item.selected);
    this.selectItems.emit(this.funds.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.fundsService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Funds, err);
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
        this.fundsService
          .cancel([id], data => {
            if (data.IsValid) {
              this.fundsService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Funds, err);
              }, () => {
                this.alertService.cancelSuccess();
              });
            } else {
              this.alertService.cancelFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
