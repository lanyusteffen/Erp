import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { ProductService } from './product.service';
import { ProductDisabledComponent } from './product-disabled.component';
import { ProductDisabledListComponent } from './components/disabled/disabled.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [

  {
    path: '', component: ProductDisabledComponent, outlet: 'products-product-disabled'
  }
];

@NgModule({
  declarations: [
    ProductDisabledComponent,
    ProductDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [ProductService]
})

export class ProductDisabledModule { }
