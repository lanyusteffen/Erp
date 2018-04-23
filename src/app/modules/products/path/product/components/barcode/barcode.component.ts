import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';

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
    private alertService: AlertService
  ) {
    this.subscription = this.productService
      .get()
      .subscribe(({ barcodes, currentPagination }) => {
        this.barcodes = barcodes;
        this.pagination = currentPagination;
      });
  }


  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定条形码列表失败!' + err
    });
  }

  ngOnInit() {
    this.productService.listBarcode((err) => {
      this.listErrorCallBack(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeBarcode(item, barcode) {
    item.BarCode = barcode;
    this.productService.modifyBarCode(item, data => {
      if (data.IsValid) {
        this.alertService.open({
          type: 'success',
          content: '修改条形码成功！'
        });
        this.productService.listBarcode((err) => {
          this.listErrorCallBack(err);
        });
      }
    }, (err) => {
      this.alertService.open({
        type: 'daner',
        content: '修改条形码失败！'
      });
    });
  }
}
