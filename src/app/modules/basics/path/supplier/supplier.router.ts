import { SupplierDisabledComponent } from './supplier-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SupplierComponent } from './supplier.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: SupplierComponent },
        { path: 'disabled', component: SupplierDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class SupplierRoutingModule {
  }
