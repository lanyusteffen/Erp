import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './components/list/list.component';
import { EmployeeActionsComponent } from './components/actions/actions.component';
import { EmployeeControlComponent } from './components/control/control.component';
import { EmployeeDisabledComponent } from './employee-disabled.component';
import { EmployeeDisabledListComponent } from './components/disabled/disabled.component';

import { EmployeeService } from './employee.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { EmployeeRoutingModule } from './employee.router';
import { DepartmentSharedModule } from '../department/department-shared.module';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
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
    DepartmentSharedModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  providers: [ EmployeeService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class EmployeeModule { }
