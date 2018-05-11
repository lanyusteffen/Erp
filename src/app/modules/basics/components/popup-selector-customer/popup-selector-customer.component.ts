import { Component, OnInit } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-popup-selector-customer',
  templateUrl: './popup-selector-customer.component.html',
  styleUrls: ['./popup-selector-customer.component.less']
})
export class PopupSelectorCustomerComponent implements OnInit {

  isMultiSelect: boolean;

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.dataService.listCustomers((err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定客户列表列表失败!' + err
      });
    });
  }
}
