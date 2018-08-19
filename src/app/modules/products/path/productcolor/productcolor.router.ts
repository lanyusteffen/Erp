import { ProductColorDisabledComponent } from './productcolor-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductColorComponent } from './productcolor.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: ProductColorComponent },
    { path: 'disabled', component: ProductColorDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ProductColorRoutingModule {
}
