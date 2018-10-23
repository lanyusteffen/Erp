import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StorageOutService } from '../../storageout.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-storageout-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class StorageOutDisabledListComponent implements OnInit, OnDestroy {
  private storageOuts = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private systemConfig: boolean;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private storageOutService: StorageOutService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.storageOutService
      .getDisabled()
      .subscribe(({ storageOuts, currentPagination }) => {
        this.storageOuts = storageOuts;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.storageOutService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
        this.storageOutService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.storageOutService.listDisabled((err) => {
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
        this.storageOutService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.storageOutService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
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
