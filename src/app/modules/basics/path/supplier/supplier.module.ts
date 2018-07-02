import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { SupplierComponent } from './supplier.component';
import { SupplierListComponent } from './components/list/list.component';
import { SupplierActionsComponent } from './components/actions/actions.component';
import { SupplierControlComponent } from './components/control/control.component';
import { SupplierService } from './supplier.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';


export const ROUTES: Routes = [
  {
    path: '', component: SupplierComponent, outlet: 'basics-supplier'
  }
];

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierListComponent,
    SupplierActionsComponent,
    SupplierControlComponent
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
  providers: [SupplierService]
})

export class SupplierModule { }
