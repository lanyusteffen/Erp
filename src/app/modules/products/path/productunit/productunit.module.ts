import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { ProductUnitComponent } from './productunit.component';
import { ProductUnitListComponent } from './components/list/list.component';
import { ProductUnitActionsComponent } from './components/actions/actions.component';
import { ProductUnitControlComponent } from './components/control/control.component';
import { ProductUnitDisabledComponent } from './productunit-disabled.component';
import { ProductUnitDisabledListComponent } from './components/disabled/disabled.component';

import { ProductUnitService } from './productunit.service';
import { SharedModule } from '@app/shared.module';
import { ProductUnitRoutingModule } from './productunit.router';

@NgModule({
  declarations: [
    ProductUnitComponent,
    ProductUnitListComponent,
    ProductUnitActionsComponent,
    ProductUnitControlComponent,
    ProductUnitDisabledComponent,
    ProductUnitDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductUnitRoutingModule
  ],
  providers: [ ProductUnitService ]
})

export class ProductUnitModule {
}
