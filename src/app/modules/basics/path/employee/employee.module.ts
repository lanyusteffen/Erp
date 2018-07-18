import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './components/list/list.component';
import { EmployeeSelectorComponent } from './components/employee-selector/employee-selector.component';
import { EmployeeActionsComponent } from './components/actions/actions.component';
import { EmployeeControlComponent } from './components/control/control.component';
import { EmployeeDisabledComponent } from './employee-disabled.component';
import { EmployeeDisabledListComponent } from './components/disabled/disabled.component';

import { EmployeeService } from './employee.service';
import { FormService } from '@services/form.service';

import { DepartmentModule } from '../department/department.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { EmployeeRoutingModule } from './employee.router';

@NgModule({
  declarations: [
    EmployeeSelectorComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeActionsComponent,
    EmployeeControlComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDisabledComponent,
    EmployeeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    DepartmentModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  exports: [ EmployeeSelectorComponent, EmployeeListComponent ],
  providers: [ EmployeeService ]
})

export class EmployeeModule { }
