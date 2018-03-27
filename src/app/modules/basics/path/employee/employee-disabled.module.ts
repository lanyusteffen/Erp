import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { EmployeeService } from './employee.service';
import { EmployeeDisabledComponent } from './employee-disabled.component';
import { EmployeeDisabledListComponent } from './components/disabled/disabled.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  
  {
    path: '', component: EmployeeDisabledComponent, outlet: 'basics-employee-disabled'
  }
];

@NgModule({
  declarations: [
    EmployeeDisabledComponent,
    EmployeeDisabledListComponent
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
  providers: [EmployeeService]
})

export class EmployeeDisabledModule {}
