import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SystemUnitSelectorComponent } from './systemunit-selector/systemunit-selector.component';
import { PopupSelectorGoodsComponent } from './popup-selector-goods/popup-selector-goods.component';
import { StorageSelectorComponent } from './storage-selector/storage-selector.component';

import { SystemUnitService } from '../path/systemunit/systemunit.service';
import { SharedModule } from '../../../shared.module';

@NgModule({
  declarations: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent,
    StorageSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent,
    StorageSelectorComponent
  ],
  providers: [
    SystemUnitService
  ]
})

export class ProductsSharedModule {
}
