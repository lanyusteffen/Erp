import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { FundsDisabledListComponent } from './component/disabled/disabled.component';
import { FundsDisabledComponent } from './funds-disabled.component';
import { FundsService } from './funds.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: FundsDisabledComponent, outlet: 'finances-funds-disabled'
  }
];

@NgModule({
  declarations: [
    FundsDisabledComponent,
    FundsDisabledListComponent
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
    FundsService
  ]
})

export class FundsDisabledModule {}
