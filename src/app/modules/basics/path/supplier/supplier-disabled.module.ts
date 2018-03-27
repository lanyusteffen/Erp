import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { SupplierDisabledListComponent } from './components/disabled/disabled.component';
import { SupplierDisabledComponent } from './supplier-disabled.component';
import { SupplierService } from './supplier.service';
import { FormService } from '@services/form.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: SupplierDisabledComponent, outlet: 'basics-supplier-disabled'
  }
];

@NgModule({
  declarations: [
    SupplierDisabledComponent,
    SupplierDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    AreaModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    SupplierService
  ]
})

export class SupplierDisabledModule {}
