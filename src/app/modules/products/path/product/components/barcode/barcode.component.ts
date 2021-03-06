﻿import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-product-barcode-list',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.less']
})

export class ProductBarcodeListComponent implements OnInit, OnDestroy {
  private barcodes = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.productService
      .getBarcode()
      .subscribe(({ barcodes, currentPagination }) => {
        this.barcodes = barcodes;
        this.pagination = currentPagination;
      });
  }


  ngOnInit() {
    this.productService.listBarcode((err) => {
      this.alertService.listErrorCallBack(ModuleName.Barcode, err);
      this.loadingBar.complete();
    },()=>{
      this.loadingBar.complete();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeBarcode(item, barcode) {
    item.BarCode = barcode;
    this.productService.modifyBarCode(item, data => {
      if (data.IsValid) {
        this.alertService.modifySuccess();
        this.productService.listBarcode((err) => {
          this.alertService.listErrorCallBack(ModuleName.Barcode, err);
        });
      }
    }, (err) => {
      this.alertService.modifyFail(err);
    });
  }

  onBarCodePageChange({ current, pageSize }) {
    this.productService.onBarCodePageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Product, err);
    });
  }
}
