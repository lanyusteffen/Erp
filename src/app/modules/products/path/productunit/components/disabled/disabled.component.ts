import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductUnitService } from '../../productunit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productunit-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class ProductUnitDisabledListComponent implements OnInit, OnDestroy {
  private productUnits = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private systemConfig: boolean;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private productUnitService: ProductUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.productUnitService
      .get()
      .subscribe(({ productUnits, currentPagination }) => {
        this.productUnits = productUnits;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.productUnitService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.productUnits = this.productUnits.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.productUnits : []);

  }

  select(evt, selectedItem) {
    this.productUnits = this.productUnits.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.productUnits.every(item => item.selected);
    this.selectItems.emit(this.productUnits.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.productUnitService.onPageChange({
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
        this.productUnitService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productUnitService.listDisabled((err) => {
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
        this.productUnitService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.productUnitService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
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
