import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { ReceiveService } from '../../receive.service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AlertService } from '@services/alert.service';
import { DatePipe } from '@angular/common';
import { ConfirmService } from '@services/confirm.service';
import { ModuleName } from '@services/alert.service';
import { NavItem } from '@contracts/nav.item';
import { PopupSelectorGoodsSimpleComponent } from 
'../../../../../products/components/popup-selector-goods-simple/popup-selector-goods-simple.component';

const queryItemBase = {
  CustomerId: null,
  EmployeeId: null,
  DepartmentId: null,
  GoodsId: null,
  ProductId: null,
  BeginDate: null,
  EndDate: null
};

@Component({
  selector: 'app-receive-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less'],
  providers: [
    ReceiveService,
    AlertService,
    DatePipe
  ]
})
export class ReceiveActionsComponent implements OnInit {

  @ViewChild(PopupSelectorGoodsSimpleComponent)
  private goodsPopupSelector: PopupSelectorGoodsSimpleComponent;

  @ViewChild('queryGoodsName')
  private el: ElementRef;

  private selectedCustomer: any;
  private selectedEmployee: any;

  @Output() onExecuteQuery: EventEmitter<any> = new EventEmitter();

  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  @Input() selectedItems = <any>[];

  @Input()
  selectNav: NavItem;

  private queryItem = null;

  constructor(
    private datePipe: DatePipe,
    private elementRef: ElementRef,
    private receiveOrderService: ReceiveService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private receiveService: ReceiveService) {
    this.queryItem = Object.assign({}, queryItemBase);
  }

  selectCustomer(item: any): void {
    this.selectCustomer = item;
    this.queryItem.CustomerId = item.Id;
  }

  selectEmployee(item: any): void {
    this.selectEmployee = item;
    this.queryItem.EmployeeId = item.Id;
  }

  selectGoods(item: any): void {
    this.el.nativeElement.value = item[0].Name;
    this.queryItem.GoodsId = item[0].Id;
    this.queryItem.ProductId = item[0].ProductId;
  }

  selectDepartment(selectedValue: any): void {
    this.queryItem.DepartmentId = selectedValue;
  }

  ngOnInit() {
    this.receiveService.getQueryDateRange(err => {
    }, data => {
      this.queryItem.BeginDate = this.datePipe.transform(<Date>data[0], 'yyyy-MM-dd');
      this.queryItem.EndDate = this.datePipe.transform(<Date>data[1], 'yyyy-MM-dd');
    });
  }

  query() {
    const queryItem = Object.assign({}, this.queryItem);
    this.onExecuteQuery.emit(queryItem);
  }

  audit() {
    this.confirmService.open({
      content: '确认审核已选中采购单吗？',
      onConfirm: () => {
        this.receiveOrderService
          .audit(this.getSelected(), data => {
            if (data.IsValid) {
              this.alertService.auditSuccess();
              this.receiveOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Receive, err);
              });
            }
          }, (err) => {
            this.alertService.auditFail(err);
          });
      }
    });
  }

  unAudit() {
    this.confirmService.open({
      content: '确认反审核已选中采购单吗？',
      onConfirm: () => {
        this.receiveOrderService
          .unAudit(this.getSelected(), data => {
            if (data.IsValid) {
              this.alertService.unAuditSuccess();
              this.receiveOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Receive, err);
              });
            }
          }, (err) => {
            this.alertService.unAuditFail(err);
          });
      }
    });
  }

  cancel() {
    this.confirmService.open({
      content: '确认删除已选中采购单吗？',
      onConfirm: () => {
        this.receiveOrderService
          .cancel(this.getSelected(), data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.receiveOrderService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Receive, err);
              });
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }

  /**
   * 获取已选中采购单Id集合
   */
  getSelected() {
    return this.selectedItems.map(item => item.Id);
  }

  showModal() {
    this.goodsPopupSelector.show = true;
  }
}
