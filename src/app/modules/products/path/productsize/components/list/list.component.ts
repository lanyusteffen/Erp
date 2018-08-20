import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductSizeService } from '../../productsize.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productsize-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ProductSizeListComponent implements OnInit, OnDestroy {
  private productSizes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

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
    this.productSizeService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
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
      this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
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
        this.productSizeService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.productSizeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
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
        this.productSizeService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productSizeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductSize, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
