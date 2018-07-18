import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './component/list/list.component';
import { CustomerActionsComponent } from './component/actions/actions.component';
import { CustomerControlComponent } from './component/control/control.component';
import { CustomerDisabledComponent } from './customer-disabled.component';
import { CustomerDisabledListComponent } from './component/disabled/disabled.component';

import { CustomerService } from './customer.service';
import { FormService } from '@services/form.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { CustomerRoutingModule } from './customer.router';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerActionsComponent,
    CustomerControlComponent,
    CustomerDisabledComponent,
    CustomerDisabledListComponent
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
    CustomerRoutingModule
  ],
  providers: [ CustomerService ]
})

export class CustomerModule {}
