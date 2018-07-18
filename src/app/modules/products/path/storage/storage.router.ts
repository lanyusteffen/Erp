import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StorageDisabledComponent } from './storage-disabled.component';
import { StorageComponent } from './storage.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: StorageComponent },
        { path: 'disabled', component: StorageDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class StorageRoutingModule {
  }
