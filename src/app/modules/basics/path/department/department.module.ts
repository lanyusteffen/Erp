import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { DepartmentSelectorComponent } from './components/department-selector/department-selector.component';
import { DepartmentComponent } from './department.component';
import { DepartmentActionsComponent } from './components/actions/actions.component';
import { DepartmentListComponent } from './components/list/list.component';
import { DepartmentControlComponent } from './components/control/control.component';
import { DepartmentDisabledComponent } from './department-disabled.component';
import { DepartmentDisabledListComponent } from './components/disabled/disabled.component';

import { DepartmentService } from './department.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { DepartmentRoutingModule } from './department.router';

@NgModule({
  declarations: [
    DepartmentSelectorComponent,
    DepartmentComponent,
    DepartmentActionsComponent,
    DepartmentControlComponent,
    DepartmentListComponent,
    DepartmentDisabledComponent,
    DepartmentDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    DepartmentRoutingModule
  ],
  exports: [ DepartmentSelectorComponent ],
  providers: [ DepartmentService ]
})

export class DepartmentModule { }
