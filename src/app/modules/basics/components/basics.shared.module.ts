import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { CustomerPopupSelectorComponent } from './customer-popup-selector/customer-popup-selector.component';
import { PopupSelectorEmployeeComponent } from './popup-selector-employee/popup-selector-employee.component';
import { PopupSelectorCustomerComponent } from './popup-selector-customer/popup-selector-customer.component';
import { PopupSelectorOtherComponent } from './popup-selector-other/popup-selector-other.component';
import { PopupSelectorSupplierComponent } from './popup-selector-supplier/popup-selector-supplier.component';
import { AreaSelectorComponent } from './area-selector/area-selector.component';
import { EmployeeSelectorComponent } from './employee-selector/employee-selector.component';
import { DepartmentSelectorComponent } from './department-selector/department-selector.component';

import { DepartmentService } from '../path/department/department.service';
import { EmployeeService } from '../path/employee/employee.service';
import { AreaService } from '../path/area/area.service';
import { SharedModule } from '../../../shared.module';


@NgModule({
  declarations: [
    DepartmentSelectorComponent,
    AreaSelectorComponent,
    EmployeeSelectorComponent,
    CustomerPopupSelectorComponent,
    PopupSelectorCustomerComponent,
    PopupSelectorOtherComponent,
    PopupSelectorSupplierComponent,
    PopupSelectorEmployeeComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    DepartmentSelectorComponent,
    AreaSelectorComponent,
    EmployeeSelectorComponent,
    CustomerPopupSelectorComponent,
    PopupSelectorEmployeeComponent,
    PopupSelectorCustomerComponent,
    PopupSelectorOtherComponent,
    PopupSelectorSupplierComponent
  ],
  providers: [
    DepartmentService,
    EmployeeService,
    AreaService
  ]
})

export class BasicsSharedModule {
}
