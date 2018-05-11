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
import { CustomerPopupSelectorComponent } from './modules/basics/components/popup-selector-client/popup-selector-client.component';
import { PopupSelectorCustomerComponent } from './modules/basics/components/popup-selector-customer/popup-selector-customer.component';
import { PopupSelectorOtherComponent } from './modules/basics/components/popup-selector-other/popup-selector-other.component';
import { PopupSelectorSupplierComponent } from './modules/basics/components/popup-selector-supplier/popup-selector-supplier.component';

@NgModule({
  declarations: [
    QuickSearchComponent,
    CategoryComponent,
    CategoryNodeComponent,
    CardComponent,
    PaginationBarComponent,
    FormFieldComponent,
    StringAddonPipe,
    CustomerPopupSelectorComponent,
    PopupSelectorCustomerComponent,
    PopupSelectorOtherComponent,
    PopupSelectorSupplierComponent
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
    CustomerPopupSelectorComponent,
    PopupSelectorCustomerComponent,
    PopupSelectorOtherComponent,
    PopupSelectorSupplierComponent
  ]
})

export class SharedModule { }
