import { FeeTypeDisabledComponent } from './feetype-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeeTypeComponent } from './feetype.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: FeeTypeComponent },
        { path: 'disabled', component: FeeTypeDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class FeeTypeRoutingModule {
  }
