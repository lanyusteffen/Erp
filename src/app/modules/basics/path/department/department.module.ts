import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { DepartmentComponent } from './department.component';
import { DepartmentActionsComponent } from './components/actions/actions.component';
import { DepartmentListComponent } from './components/list/list.component';
import { DepartmentControlComponent } from './components/control/control.component';
import { DepartmentDisabledComponent } from './department-disabled.component';
import { DepartmentDisabledListComponent } from './components/disabled/disabled.component';

import { DepartmentService } from './department.service';

import { SharedModule } from '@app/shared.module';
import { DepartmentRoutingModule } from './department.router';

@NgModule({
  declarations: [
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
    SharedModule,
    DepartmentRoutingModule
  ],
  providers: [ DepartmentService ]
})

export class DepartmentModule {
}
