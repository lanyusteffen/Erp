import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { OtherIncomeComponent } from './otherincome.component';
import { OtherIncomeListComponent } from './components/list/list.component';
import { OtherIncomeActionsComponent } from './components/actions/actions.component';
import { OtherIncomeControlComponent } from './components/control/control.component';
import { OtherIncomeDisabledComponent } from './otherincome-disabled.component';
import { OtherIncomeDisabledListComponent } from './components/disabled/disabled.component';

import { OtherIncomeService } from './otherincome.service';

import { SharedModule } from '@app/shared.module';
import { OtherIncomeRoutingModule } from './otherincome.router';

@NgModule({
  declarations: [
    OtherIncomeComponent,
    OtherIncomeListComponent,
    OtherIncomeActionsComponent,
    OtherIncomeControlComponent,
    OtherIncomeDisabledComponent,
    OtherIncomeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OtherIncomeRoutingModule
  ],
  providers: [ OtherIncomeService ]
})

export class OtherIncomeModule {
}
