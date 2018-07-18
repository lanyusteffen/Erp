import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PurchaseOrderNewComponent } from './new/new.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: 'new', component: PurchaseOrderNewComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class PurchaseOrderRoutingModule {
  }
