import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OtherExchangeUnitComponent } from './other-exchange-unit.component';
import { OtherExchangeUnitListComponent } from './components/list/list.component';

export const ROUTES: Routes = [
    {
      path: '',
      children: [
        { path: '', component: OtherExchangeUnitComponent },
        { path: 'disabled', component: OtherExchangeUnitListComponent }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

  export class OtherExchangeUnitRoutingModule {
  }
