﻿import { SystemUnitDisabledComponent } from './systemunit-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SystemUnitComponent } from './systemunit.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: SystemUnitComponent },
    { path: 'disabled', component: SystemUnitDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class SystemUnitRoutingModule {
}
