import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { OtherExchangeUnitComponent } from './other-exchange-unit.component';
import { OtherExchangeUnitListComponent } from './components/list/list.component';
import { OtherExchangeUnitActionsComponent } from './components/actions/actions.component';
import { OtherExchangeUnitControlComponent } from './components/control/control.component';
import { OtherExchangeUnitDisabledComponent } from './other-exchange-unit-disabled.component';
import { OtherExchangeUnitDisabledListComponent } from './components/disabled/disabled.component';

import { OtherExchangeUnitService } from './other-exchange-unit.service';
import { FormService } from '@services/form.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { OtherExchangeUnitRoutingModule } from './other-exchange-unit.router';

@NgModule({
  declarations: [
    OtherExchangeUnitDisabledComponent,
    OtherExchangeUnitDisabledListComponent,
    OtherExchangeUnitComponent,
    OtherExchangeUnitListComponent,
    OtherExchangeUnitActionsComponent,
    OtherExchangeUnitControlComponent
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
    OtherExchangeUnitRoutingModule
  ],
  providers: [ OtherExchangeUnitService ]
})

export class OtherExchangeUnitModule {
}
