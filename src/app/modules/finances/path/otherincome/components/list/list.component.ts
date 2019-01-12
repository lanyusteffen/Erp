import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OtherIncomeService } from '../../otherincome.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-otherincome-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class OtherIncomeListComponent implements OnInit, OnDestroy {
  private otherIncomes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private otherIncomeService: OtherIncomeService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.otherIncomeService
      .get()
      .subscribe(({ otherIncomes, currentPagination }) => {
        this.otherIncomes = otherIncomes;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.otherIncomeService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
    });
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
      this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
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
        this.otherIncomeService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.otherIncomeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
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
        this.otherIncomeService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.otherIncomeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.OtherIncome, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
