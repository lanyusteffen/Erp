import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FundsDisabledComponent } from './funds-disabled.component';
import { FundsComponent } from './funds.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: FundsComponent },
        { path: 'disabled', component: FundsDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class FundsRoutingModule {
  }
