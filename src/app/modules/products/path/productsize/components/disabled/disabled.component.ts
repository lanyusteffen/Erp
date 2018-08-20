import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductSizeService } from '../../productsize.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productsize-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class ProductSizeDisabledListComponent implements OnInit, OnDestroy {
  private productSizes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private systemConfig: boolean;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private productSizeService: ProductSizeService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.productSizeService
      .get()
      .subscribe(({ productSizes, currentPagination }) => {
        this.productSizes = productSizes;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.productSizeService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.productSizes = this.productSizes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.productSizes : []);

  }

  select(evt, selectedItem) {
    this.productSizes = this.productSizes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.productSizes.every(item => item.selected);
    this.selectItems.emit(this.productSizes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.productSizeService.onPageChange({
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
        this.productSizeService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productSizeService.listDisabled((err) => {
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
        this.productSizeService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.productSizeService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
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
