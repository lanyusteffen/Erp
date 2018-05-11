import { Component, OnInit, Input } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-popup-selector-customer',
  templateUrl: './popup-selector-customer.component.html',
  styleUrls: ['./popup-selector-customer.component.less']
})
export class PopupSelectorCustomerComponent implements OnInit {

  private customers = <any>[];
  private pagination = {};
  private isMultiSelect: boolean;

  _show: boolean;

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.listCustomers(({ customers, currentPagination }) => {
        this.customers = customers;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定客户列表失败!' + err
        });
      });
    }
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
