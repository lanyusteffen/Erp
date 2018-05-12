import { Component, Input, ViewChild } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-popup-selector-supplier',
  templateUrl: './popup-selector-supplier.component.html',
  styleUrls: ['./popup-selector-supplier.component.less']
})
export class PopupSelectorSupplierComponent {

  // 获取模板内的第一个指定组件
  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  private suppliers = <any>[];
  private pagination = {};
  private isMultiSelect: boolean;

  _show: boolean;

  get show() {
    return this._show;
  }

  private _options = [
    { label: '10 条／页', value: 10 }
  ];

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listSupplier(({ suppliers, currentPagination }) => {
        this.suppliers = suppliers;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定供应商列表失败!' + err
        });
      });
    }
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
