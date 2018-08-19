import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { ProductColorComponent } from './productcolor.component';
import { ProductColorListComponent } from './components/list/list.component';
import { ProductColorActionsComponent } from './components/actions/actions.component';
import { ProductColorControlComponent } from './components/control/control.component';
import { ProductColorDisabledComponent } from './productcolor-disabled.component';
import { ProductColorDisabledListComponent } from './components/disabled/disabled.component';

import { ProductColorService } from './productcolor.service';
import { SharedModule } from '@app/shared.module';
import { ProductColorRoutingModule } from './productcolor.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    ProductColorComponent,
    ProductColorListComponent,
    ProductColorActionsComponent,
    ProductColorControlComponent,
    ProductColorDisabledComponent,
    ProductColorDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductColorRoutingModule
  ],
  providers: [ ProductColorService ]
})

export class ProductColorModule {
}
