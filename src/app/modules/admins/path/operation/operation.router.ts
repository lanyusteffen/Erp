import { OperationDisabledComponent } from './operation-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OperationComponent } from './operation.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: OperationComponent },
        { path: 'disabled', component: OperationDisabledComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class OperationRoutingModule {
  }
