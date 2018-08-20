import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductUnitService } from '../../productunit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productunit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ProductUnitListComponent implements OnInit, OnDestroy {
  private productUnits = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

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
    this.productUnitService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
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
      this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
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
        this.productUnitService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.productUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
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
        this.productUnitService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
