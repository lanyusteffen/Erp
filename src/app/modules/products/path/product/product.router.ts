import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDisabledComponent } from './product-disabled.component';
import { ProductComponent } from './product.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: ProductComponent },
        { path: 'disabled', component: ProductDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class ProductRoutingModule {
  }
