import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { IncomeTypeDisabledListComponent } from './component/disabled/disabled.component';
import { IncomeTypeDisabledComponent } from './incometype-disabled.component';
import { IncomeTypeService } from './incometype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: IncomeTypeDisabledComponent, outlet: 'finances-incometype-disabled'
  }
];

@NgModule({
  declarations: [
    IncomeTypeDisabledComponent,
    IncomeTypeDisabledListComponent
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
  providers: [
    IncomeTypeService
  ]
})

export class IncomeTypeDisabledModule {}
