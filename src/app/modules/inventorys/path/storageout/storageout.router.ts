import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StorageOutNewComponent } from './new/new.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: 'new', component: StorageOutNewComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class StorageOutRoutingModule {
  }
