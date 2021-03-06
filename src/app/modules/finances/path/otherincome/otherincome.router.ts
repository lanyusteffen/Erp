﻿import { OtherIncomeDisabledComponent } from './otherincome-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OtherIncomeComponent } from './otherincome.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: OtherIncomeComponent },
    { path: 'disabled', component: OtherIncomeDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class OtherIncomeRoutingModule {
}
