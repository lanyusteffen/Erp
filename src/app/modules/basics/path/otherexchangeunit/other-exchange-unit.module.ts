import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { OtherExchangeUnitComponent } from './other-exchange-unit.component';
import { OtherExchangeUnitListComponent } from './components/list/list.component';
import { OtherExchangeUnitActionsComponent } from './components/actions/actions.component';
import { OtherExchangeUnitControlComponent } from './components/control/control.component';
import { OtherExchangeUnitService } from './other-exchange-unit.service';
import { FormService } from '@services/form.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: OtherExchangeUnitComponent, outlet: 'basics-otherexchangeunit'
  }
];

@NgModule({
  declarations: [
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
    RouterModule.forChild(ROUTES)
  ],
  providers: [OtherExchangeUnitService]
})

export class OtherExchangeUnitModule {}
