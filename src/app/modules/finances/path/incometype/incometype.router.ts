import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IncomeTypeComponent } from './incometype.component';
import { IncomeTypeDisabledComponent } from './incometype-disabled.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: IncomeTypeComponent },
        { path: 'disabled', component: IncomeTypeDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class IncomeTypeRoutingModule {
  }
