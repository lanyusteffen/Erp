import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { CommonService } from './common.service';
import { SalePriceLevelSelectorComponent } from './components/sale-price-level-selector/sale-price-level-selector.component';


@NgModule({
  declarations: [
    SalePriceLevelSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [
    SalePriceLevelSelectorComponent
  ],
  providers: [CommonService]
})

export class AppCommonModule {}
