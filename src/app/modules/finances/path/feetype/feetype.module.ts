﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { FeeTypeComponent } from './feetype.component';
import { FeeTypeListComponent } from './components/list/list.component';
import { FeeTypeActionsComponent } from './components/actions/actions.component';
import { FeeTypeControlComponent } from './components/control/control.component';
import { FeeTypeDisabledComponent } from './feetype-disabled.component';
import { FeeTypeDisabledListComponent } from './components/disabled/disabled.component';

import { FeeTypeService } from './feetype.service';

import { SharedModule } from '@app/shared.module';
import { FeeTypeRoutingModule } from './feetype.router';

@NgModule({
  declarations: [
    FeeTypeComponent,
    FeeTypeListComponent,
    FeeTypeActionsComponent,
    FeeTypeControlComponent,
    FeeTypeDisabledComponent,
    FeeTypeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FeeTypeRoutingModule
  ],
  providers: [ FeeTypeService ]
})

export class FeeTypeModule {
}
