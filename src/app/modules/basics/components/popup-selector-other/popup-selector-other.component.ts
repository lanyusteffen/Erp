import { Component, Input, ViewChild } from '@angular/core';
import { CustomerPopupSelectorService } from '../popup-selector-client/popup-selector-customer.service';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-popup-selector-other',
  templateUrl: './popup-selector-other.component.html',
  styleUrls: ['./popup-selector-other.component.less']
})
export class PopupSelectorOtherComponent {

  // 获取模板内的第一个指定组件
  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  private others = <any>[];
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
      this.dataService.listOthers(({ others, currentPagination }) => {
        this.others = others;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定其他往来单位列表失败!' + err
        });
      });
    }
  }

  constructor(private dataService: CustomerPopupSelectorService,
              private alertService: AlertService) {
  }
}
