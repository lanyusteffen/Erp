import { FundsAccountDisabledComponent } from './fundsAccount-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FundsAccountComponent } from './fundsAccount.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: FundsAccountComponent },
    { path: 'disabled', component: FundsAccountDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class FundsAccountRoutingModule {
}
