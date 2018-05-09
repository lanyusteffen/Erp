import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../UI/ui.module';

import { QuickSearchComponent } from '@components/quick-search/quick-search.component';
import { CategoryComponent } from '@components/category/category.component';
import { CategoryNodeComponent } from '@components/category/category-node.component';
import { CardComponent } from '@components/card/card.component';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { StringAddonPipe } from '@pipes/string-addon.pipe';
import { CustomerPopupSelectorComponent } from './modules/basics/components/customer-popup-selector/customer-popup-selector.component';

@NgModule({
  declarations: [
    QuickSearchComponent,
    CategoryComponent,
    CategoryNodeComponent,
    CardComponent,
    PaginationBarComponent,
    FormFieldComponent,
    StringAddonPipe,
    CustomerPopupSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [
    QuickSearchComponent,
    CategoryComponent,
    CategoryNodeComponent,
    CardComponent,
    PaginationBarComponent,
    FormFieldComponent,
    StringAddonPipe,
    CustomerPopupSelectorComponent
  ]
})

export class SharedModule { }
