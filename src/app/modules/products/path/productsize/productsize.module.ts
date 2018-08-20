import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { ProductSizeComponent } from './productsize.component';
import { ProductSizeListComponent } from './components/list/list.component';
import { ProductSizeActionsComponent } from './components/actions/actions.component';
import { ProductSizeControlComponent } from './components/control/control.component';
import { ProductSizeDisabledComponent } from './productsize-disabled.component';
import { ProductSizeDisabledListComponent } from './components/disabled/disabled.component';

import { ProductSizeService } from './productsize.service';
import { SharedModule } from '@app/shared.module';
import { ProductSizeRoutingModule } from './productsize.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    ProductSizeComponent,
    ProductSizeListComponent,
    ProductSizeActionsComponent,
    ProductSizeControlComponent,
    ProductSizeDisabledComponent,
    ProductSizeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductSizeRoutingModule
  ],
  providers: [ ProductSizeService ]
})

export class ProductSizeModule {
}
