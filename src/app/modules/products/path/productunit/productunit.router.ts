import { ProductUnitDisabledComponent } from './productunit-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductUnitComponent } from './productunit.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: ProductUnitComponent },
    { path: 'disabled', component: ProductUnitDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ProductUnitRoutingModule {
}
