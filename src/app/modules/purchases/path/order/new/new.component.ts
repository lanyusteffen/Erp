import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';

@Component({
  selector: 'app-purchase-order-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})

export class PurchaseOrderNewComponent implements OnInit, OnDestroy {

  @ViewChild(PopupSelectorEmployeeComponent)
  private popupSelectorEmployee: PopupSelectorEmployeeComponent;

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSeletor: CustomerPopupSelectorComponent;

  private selectedCustomer: any;
  private selectedEmployee: any;

  constructor(
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectCustomer(item: any): void {
    this.selectCustomer = item;
    this.popupSelectorEmployee.unSelect();
  }

  selectEmployee(item: any): void {
    this.selectedEmployee = item;
  }
}
