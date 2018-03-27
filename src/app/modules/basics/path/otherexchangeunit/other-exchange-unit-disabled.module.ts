import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { OtherExchangeUnitDisabledListComponent } from './components/disabled/disabled.component';
import { OtherExchangeUnitDisabledComponent } from './other-exchange-unit-disabled.component';
import { OtherExchangeUnitService } from './other-exchange-unit.service';
import { FormService } from '@services/form.service';

import { EmployeeModule } from '../employee/employee.module';
import { AreaModule } from '../area/area.module';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: OtherExchangeUnitDisabledComponent, outlet: 'basics-otherexchangeunit-disabled'
  }
];

@NgModule({
  declarations: [
    OtherExchangeUnitDisabledComponent,
    OtherExchangeUnitDisabledListComponent
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
    OtherExchangeUnitService
  ]
})

export class OtherExchangeUnitDisabledModule {}
