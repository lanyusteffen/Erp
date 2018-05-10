import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { QuickSearchComponent } from '@components/quick-search/quick-search.component';
import { CategoryComponent } from '@components/category/category.component';
import { CategoryNodeComponent } from '@components/category/category-node.component';
import { PaginationBarComponent } from '@components/pagination-bar/pagination-bar.component';
import { SharedModule } from '@app/shared.module';
import { CustomerPopupSelectorComponent } from './components/customer-popup-selector/customer-popup-selector.component';

@NgModule({
  declarations: [
    CustomerPopupSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    CustomerPopupSelectorComponent
  ]
})

export class BasicsModule { }
