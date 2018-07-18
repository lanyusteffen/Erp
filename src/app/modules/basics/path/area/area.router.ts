import { AreaDisabledComponent } from './area-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AreaComponent } from './area.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: AreaComponent },
        { path: 'disabled', component: AreaDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class AreaRoutingModule {
  }
