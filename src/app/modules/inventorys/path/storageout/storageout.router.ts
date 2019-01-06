import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StorageOutNewComponent } from './new/new.component';
import { StorageOutHistoryComponent } from './history/history.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'new', component: StorageOutNewComponent },
      { path: 'history', component: StorageOutHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class StorageOutRoutingModule {
}
