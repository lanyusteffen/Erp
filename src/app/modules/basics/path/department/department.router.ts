import { DepartmentDisabledComponent } from './department-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: DepartmentComponent },
        { path: 'disabled', component: DepartmentDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class DepartmentRoutingModule {
  }
