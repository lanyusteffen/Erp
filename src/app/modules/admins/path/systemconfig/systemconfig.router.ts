import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SystemConfigComponent } from './systemconfig.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: SystemConfigComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class SystemConfigRoutingModule {
  }
