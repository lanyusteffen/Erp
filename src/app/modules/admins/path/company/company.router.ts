import { CompanyDisabledComponent } from './company-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: CompanyComponent },
        { path: 'disabled', component: CompanyDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class CompanyRoutingModule {
  }
