import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { SupplierComponent } from './supplier.component';
import { SupplierListComponent } from './components/list/list.component';
import { SupplierActionsComponent } from './components/actions/actions.component';
import { SupplierControlComponent } from './components/control/control.component';
import { SupplierDisabledComponent } from './supplier-disabled.component';
import { SupplierDisabledListComponent } from './components/disabled/disabled.component';

import { SupplierService } from './supplier.service';
import { FormService } from '@services/form.service';

import { EmployeeSharedModule } from '../../components/employee-shared.module';
import { AreaSharedModule } from '../../components/area-shared.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { SupplierRoutingModule } from './supplier.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierListComponent,
    SupplierActionsComponent,
    SupplierControlComponent,
    SupplierDisabledComponent,
    SupplierDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeSharedModule,
    AreaSharedModule,
    AppCommonModule,
    SharedModule,
    SupplierRoutingModule
  ],
  providers: [ SupplierService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class SupplierModule { }
