import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { IDatePickerConfig } from 'ng2-date-picker';

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
  private form = new FormGroup({});
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  // get formReady(): boolean { return !!Object.keys(this.form.controls).length; }
  get formReady(): boolean { return true; }

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

  onSubmit({ value }) {
    if (value.Id === 0) {
    } else {
    }
  }
}
