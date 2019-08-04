import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReceiveNewComponent } from './new/new.component';
import { ReceiveHistoryComponent } from './history/history.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: 'new', component: ReceiveNewComponent },
        { path: 'history', component: ReceiveHistoryComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class ReceiveRoutingModule {
  }
