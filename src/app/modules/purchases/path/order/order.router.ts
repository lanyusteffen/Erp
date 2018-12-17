import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PurchaseNewComponent } from './new/new.component';
import { PurchaseHistoryComponent } from './history/history.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: 'new', component: PurchaseNewComponent },
        { path: 'history', component: PurchaseHistoryComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class PurchaseRoutingModule {
  }
