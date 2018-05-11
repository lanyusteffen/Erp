import { Component, OnInit } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-popup-selector-supplier',
  templateUrl: './popup-selector-supplier.component.html',
  styleUrls: ['./popup-selector-supplier.component.less']
})
export class PopupSelectorSupplierComponent implements OnInit {

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
