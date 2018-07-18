import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { FundsComponent } from './funds.component';
import { FundsListComponent } from './component/list/list.component';
import { FundsActionsComponent } from './component/actions/actions.component';
import { FundsControlComponent } from './component/control/control.component';
import { FundsDisabledListComponent } from './component/disabled/disabled.component';

import { FundsService } from './funds.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { FundsRoutingModule } from './funds.router';
import { FundsDisabledComponent } from './funds-disabled.component';

@NgModule({
  declarations: [
    FundsComponent,
    FundsListComponent,
    FundsActionsComponent,
    FundsControlComponent,
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
    FundsRoutingModule
  ],
  providers: [ FundsService ]
})

export class FundsModule {}
