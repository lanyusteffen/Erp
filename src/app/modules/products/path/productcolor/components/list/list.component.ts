import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductColorService } from '../../productcolor.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-productcolor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ProductColorListComponent implements OnInit, OnDestroy {
  private productColors = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private productColorService: ProductColorService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.productColorService
      .get()
      .subscribe(({ productColors, currentPagination }) => {
        this.productColors = productColors;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.productColorService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.productColors = this.productColors.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.productColors : []);
  }

  select(evt, selectedItem) {
    this.productColors = this.productColors.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.productColors.every(item => item.selected);
    this.selectItems.emit(this.productColors.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.productColorService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
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
        this.productColorService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.productColorService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
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
        this.productColorService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productColorService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
