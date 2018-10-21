import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StorageOutService } from '../../storageout.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-storageout-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class StorageOutListComponent implements OnInit, OnDestroy {
  private storageOuts = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private storageOutService: StorageOutService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.storageOutService
      .get()
      .subscribe(({ storageOuts, currentPagination }) => {
        this.storageOuts = storageOuts;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.storageOutService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.storageOutService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
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
        this.storageOutService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.storageOutService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
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
        this.storageOutService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.storageOutService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
