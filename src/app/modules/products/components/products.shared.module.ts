import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SystemUnitSelectorComponent } from './systemunit-selector/systemunit-selector.component';
import { PopupSelectorGoodsComponent } from './popup-selector-goods/popup-selector-goods.component';
import { StorageSelectorComponent } from './storage-selector/storage-selector.component';

import { SystemUnitService } from '../path/systemunit/systemunit.service';
import { SharedModule } from '../../../shared.module';
import { ProductUnitSelectorComponent } from './productunit-selector/productunit-selector.component';
import { ProductStorageSelectorComponent } from './productstorage-selector/productstorage-selector.component';
import { PopupSelectorGoodsSimpleComponent } from './popup-selector-goods-simple/popup-selector-goods-simple.component';

@NgModule({
  declarations: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent,
    StorageSelectorComponent,
    ProductUnitSelectorComponent,
    ProductStorageSelectorComponent,
    PopupSelectorGoodsSimpleComponent
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
    ProductUnitSelectorComponent,
    ProductStorageSelectorComponent,
    PopupSelectorGoodsSimpleComponent
  ],
  providers: [
    SystemUnitService
  ]
})

export class ProductsSharedModule {
}
