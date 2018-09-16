import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SystemUnitSelectorComponent } from '../components/systemunit-selector/systemunit-selector.component';

import { SystemUnitService } from '../path/systemunit/systemunit.service';
import { SharedModule } from '../../../shared.module';
import { PopupSelectorGoodsComponent } from './popup-selector-goods/popup-selector-goods.component';

@NgModule({
  declarations: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    SystemUnitSelectorComponent,
    PopupSelectorGoodsComponent
  ],
  providers: [
    SystemUnitService
  ]
})

export class ProductsSharedModule {
}
