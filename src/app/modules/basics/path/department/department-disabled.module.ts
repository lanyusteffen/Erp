import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { DepartmentService } from './department.service';
import { DepartmentDisabledComponent } from './department-disabled.component';
import { DepartmentDisabledListComponent } from './components/disabled/disabled.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [

  {
    path: '', component: DepartmentDisabledComponent, outlet: 'basics-department-disabled'
  }
];

@NgModule({
  declarations: [
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
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [DepartmentService]
})

export class DepartmentDisabledModule { }
