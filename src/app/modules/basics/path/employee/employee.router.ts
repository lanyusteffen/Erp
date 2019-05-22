import { EmployeeDisabledComponent } from './employee-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: EmployeeComponent },
        { path: 'disabled', component: EmployeeDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class EmployeeRoutingModule {
  }
