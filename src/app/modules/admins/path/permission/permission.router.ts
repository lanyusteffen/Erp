import { PermissionDisabledComponent } from './permission-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermissionComponent } from './permission.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: PermissionComponent },
        { path: 'disabled', component: PermissionDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class PermissionRoutingModule {
  }
