import { ProductSizeDisabledComponent } from './productsize-disabled.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductSizeComponent } from './productsize.component';

export const ROUTES: Routes = [{
  path: '',
  children: [
    { path: '', component: ProductSizeComponent },
    { path: 'disabled', component: ProductSizeDisabledComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ProductSizeRoutingModule {
}
