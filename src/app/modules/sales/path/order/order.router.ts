import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SaleNewComponent } from './new/new.component';
import { SaleHistoryComponent } from './history/history.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: 'new', component: SaleNewComponent },
        { path: 'history', component: SaleHistoryComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class SaleRoutingModule {
  }
