import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';


@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [
    AppService
  ]
})

export class ProductListComponent implements OnInit, OnDestroy {
  private products = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private extendProductId: number;
  private unitProductId: number;
  private storageInitProductId: number;
  private _showUpdate = false;
  private _showUnitUpdate = false;
  private _showStorageInitUpdate = false;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.productService
      .get()
      .subscribe(({ products, currentPagination }) => {
        this.products = products;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.getSystemConfig();
    this.productService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Product, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '获取系统配置失败' + err
        });
      });
    }
    return this.systemConfig;
  }



  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.products = this.products.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.products : []);

  }

  select(evt, selectedItem) {
    this.products = this.products.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.products.every(item => item.selected);
    this.selectItems.emit(this.products.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.productService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Product, err);
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  extension(id) {
    this.extendProductId = id;
    this._showUpdate = true;
  }

  unit(id) {
    this.unitProductId = id;
    this._showUnitUpdate = true;
  }

  storageInit(id) {
    this.storageInitProductId = id;
    this._showStorageInitUpdate = true;
  }

  closeExtension() {
    this._showUpdate = false;
  }

  closeUnit() {
    this._showUnitUpdate = false;
  }

  closeStorageInit() {
    this._showStorageInitUpdate = false;
  }

  onCancel(id) {
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.productService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.productService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Product, err);
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
        this.productService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.productService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Product, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
