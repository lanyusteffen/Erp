import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { ProductComponent } from './product.component';
import { ProductExtensionComponent } from './components/extension/extension.component';
import { ProductUnitComponent } from './components/unit/unit.component';
import { ProductStorageInitComponent } from './components/storageInit/storageInit.component';
import { ProductListComponent } from './components/list/list.component';
import { ProductActionsComponent } from './components/actions/actions.component';
import { ProductDisabledComponent } from './product-disabled.component';
import { ProductDisabledListComponent } from './components/disabled/disabled.component';

import { ProductService } from './product.service';
import { FormService } from '@services/form.service';

import { SharedModule } from '@app/shared.module';
import { ProductRoutingModule } from './product.router';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductActionsComponent,
    ProductExtensionComponent,
    ProductStorageInitComponent,
    ProductUnitComponent,
    ProductDisabledComponent,
    ProductDisabledListComponent
 ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule
  ],
  exports: [],
  providers: [ ProductService ]
})

export class ProductModule {
}
