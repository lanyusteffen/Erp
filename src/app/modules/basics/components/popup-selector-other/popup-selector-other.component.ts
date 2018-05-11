import { Component, OnInit } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-popup-selector-other',
  templateUrl: './popup-selector-other.component.html',
  styleUrls: ['./popup-selector-other.component.less']
})
export class PopupSelectorOtherComponent implements OnInit {

  isMultiSelect: boolean;

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.dataService.listOthers((err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定其他客户列表失败!' + err
      });
    });
  }
}
