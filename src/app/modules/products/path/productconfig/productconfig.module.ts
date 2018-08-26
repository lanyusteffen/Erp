import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { ProductConfigComponent } from './productconfig.component';
import { ProductConfigControlComponent } from './components/control/control.component';
import { ProductConfigService } from './productconfig.service';
import { SharedModule } from '@app/shared.module';
import { ProductConfigRoutingModule } from './productconfig.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    ProductConfigComponent,
    ProductConfigControlComponent,
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductConfigRoutingModule
  ],
  providers: [ ProductConfigService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class ProductConfigModule {
}
