import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './component/list/list.component';
import { CustomerActionsComponent } from './component/actions/actions.component';
import { CustomerControlComponent } from './component/control/control.component';
import { CustomerDisabledComponent } from './customer-disabled.component';
import { CustomerDisabledListComponent } from './component/disabled/disabled.component';

import { CustomerService } from './customer.service';
import { FormService } from '@services/form.service';

import { EmployeeSharedModule } from '../../components/employee-shared.module';
import { AreaSharedModule } from '../../components/area-shared.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { CustomerRoutingModule } from './customer.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

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
    EmployeeSharedModule,
    AreaSharedModule,
    AppCommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  providers: [ CustomerService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class CustomerModule {
}
