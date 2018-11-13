import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SystemUnitSelectorComponent } from './systemunit-selector/systemunit-selector.component';
import { PopupSelectorGoodsComponent } from './popup-selector-goods/popup-selector-goods.component';
import { StorageSelectorComponent } from './storage-selector/storage-selector.component';

import { SystemUnitService } from '../path/systemunit/systemunit.service';
import { SharedModule } from '../../../shared.module';
import { ProductUnitSelectorComponent } from './productunit-selector/productunit-selector.component';

@NgModule({
  declarations: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent,
    StorageSelectorComponent,
    ProductUnitSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent,
    StorageSelectorComponent,
    ProductUnitSelectorComponent
  ],
  providers: [
    SystemUnitService
  ]
})

export class ProductsSharedModule {
}
