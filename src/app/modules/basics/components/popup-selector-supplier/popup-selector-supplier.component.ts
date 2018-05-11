import { Component, OnInit, Input } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-popup-selector-supplier',
  templateUrl: './popup-selector-supplier.component.html',
  styleUrls: ['./popup-selector-supplier.component.less']
})
export class PopupSelectorSupplierComponent implements OnInit {

  _show: boolean;
  isMultiSelect: boolean;

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listSupplier((err) => {
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

  ngOnInit() {
  }
}
