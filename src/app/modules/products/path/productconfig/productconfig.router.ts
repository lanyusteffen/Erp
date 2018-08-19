import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductConfigComponent } from './productconfig.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: ProductConfigComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ProductConfigRoutingModule {
}
