import { CustomerDisabledComponent } from './customer-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: CustomerComponent },
        { path: 'disabled', component: CustomerDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class CustomerRoutingModule {
  }
