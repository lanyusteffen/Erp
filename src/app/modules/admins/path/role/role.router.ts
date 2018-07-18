import { RoleDisabledComponent } from './role-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: RoleComponent },
        { path: 'disabled', component: RoleDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class RoleRoutingModule {
  }
