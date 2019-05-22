import { UserDisabledComponent } from './user-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: UserComponent },
        { path: 'disabled', component: UserDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class UserRoutingModule {
  }
