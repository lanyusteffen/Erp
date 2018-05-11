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

@NgModule({
  declarations: [],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
  ]
})

export class BasicsModule { }
