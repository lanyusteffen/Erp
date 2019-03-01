import { MenuDisabledComponent } from './menu-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: MenuComponent },
        { path: 'disabled', component: MenuDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class MenuRoutingModule {
  }
