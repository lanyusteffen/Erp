import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { FundsAccountComponent } from './fundsaccount.component';
import { FundsAccountListComponent } from './components/list/list.component';
import { FundsAccountActionsComponent } from './components/actions/actions.component';
import { FundsAccountControlComponent } from './components/control/control.component';
import { FundsAccountDisabledComponent } from './fundsAccount-disabled.component';
import { FundsAccountDisabledListComponent } from './components/disabled/disabled.component';

import { FundsAccountService } from './fundsaccount.service';
import { FormService } from '@services/form.service';

import { SharedModule } from '@app/shared.module';
import { FundsAccountRoutingModule } from './fundsaccount.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    FundsAccountComponent,
    FundsAccountListComponent,
    FundsAccountActionsComponent,
    FundsAccountControlComponent,
    FundsAccountDisabledComponent,
    FundsAccountDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FundsAccountRoutingModule
  ],
  providers: [ FundsAccountService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class FundsAccountModule {
}
