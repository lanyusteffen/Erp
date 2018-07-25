import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FeeTypeService } from '../../feeType.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-feetype-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class FeeTypeDisabledListComponent implements OnInit, OnDestroy {
  private feeTypes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private systemConfig: boolean;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private feeTypeService: FeeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.feeTypeService
      .get()
      .subscribe(({ feeTypes, currentPagination }) => {
        this.feeTypes = feeTypes;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.feeTypeService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
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
    this.feeTypeService.onPageChange({
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
        this.feeTypeService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.feeTypeService.listDisabled((err) => {
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
        this.feeTypeService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.feeTypeService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.FeeType, err);
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
