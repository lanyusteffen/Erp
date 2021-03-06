﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { SystemUnitComponent } from './systemunit.component';
import { SystemUnitListComponent } from './components/list/list.component';
import { SystemUnitActionsComponent } from './components/actions/actions.component';
import { SystemUnitControlComponent } from './components/control/control.component';
import { SystemUnitDisabledComponent } from './systemunit-disabled.component';
import { SystemUnitDisabledListComponent } from './components/disabled/disabled.component';

import { SystemUnitService } from './systemunit.service';

import { SharedModule } from '@app/shared.module';
import { SystemUnitRoutingModule } from './systemunit.router';

@NgModule({
  declarations: [
    SystemUnitComponent,
    SystemUnitListComponent,
    SystemUnitActionsComponent,
    SystemUnitControlComponent,
    SystemUnitDisabledComponent,
    SystemUnitDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SystemUnitRoutingModule
  ],
  providers: [ SystemUnitService ]
})

export class SystemUnitModule {
}
