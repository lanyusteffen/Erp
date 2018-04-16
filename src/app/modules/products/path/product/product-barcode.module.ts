import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { ProductService } from './product.service';
import { ProductBarcodeComponent } from './product-barcode.component';
import { ProductBarcodeListComponent } from './components/barcode/barcode.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: ProductBarcodeComponent, outlet: 'products-product-barcode'
  }
];

@NgModule({
  declarations: [
    ProductBarcodeComponent,
    ProductBarcodeListComponent
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

export class ProductBarcodeModule { }
