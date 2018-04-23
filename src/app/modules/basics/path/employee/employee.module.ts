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
import { QuickSearchComponent } from '@components/quick-search/quick-search.component';
import { EmployeeService } from './employee.service';
import { FormService } from '@services/form.service';

import { DepartmentModule } from '../department/department.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: EmployeeComponent, outlet: 'basics-employee'
  }
];

@NgModule({
  declarations: [
    EmployeeSelectorComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeActionsComponent,
    EmployeeControlComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    DepartmentModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [EmployeeSelectorComponent, EmployeeListComponent],
  providers: [EmployeeService]
})

export class EmployeeModule { }
