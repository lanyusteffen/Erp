import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { FundsComponent } from './funds.component';
import { FundsListComponent } from './components/list/list.component';
import { FundsActionsComponent } from './components/actions/actions.component';
import { FundsControlComponent } from './components/control/control.component';
import { FundsDisabledComponent } from './funds-disabled.component';
import { FundsDisabledListComponent } from './components/disabled/disabled.component';

import { FundsService } from './funds.service';
import { FormService } from '@services/form.service';

import { SharedModule } from '@app/shared.module';
import { FundsRoutingModule } from './funds.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

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
    SharedModule,
    FundsRoutingModule
  ],
  providers: [ FundsService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class FundsModule {}
