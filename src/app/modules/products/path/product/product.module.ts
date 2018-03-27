import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductExtensionComponent } from './components/extension/extension.component';
import { ProductUnitComponent } from './components/unit/unit.component';
import { ProductStorageInitComponent } from './components/storageInit/storageInit.component';
import { ProductListComponent } from './components/list/list.component';
import { ProductActionsComponent } from './components/actions/actions.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: ProductComponent, outlet: 'products-product'
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductActionsComponent,
    ProductExtensionComponent,
    ProductStorageInitComponent,
    ProductUnitComponent
 ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [ProductService]
})

export class ProductModule {}
