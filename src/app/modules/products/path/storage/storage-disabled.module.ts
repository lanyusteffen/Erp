import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { StorageService } from './storage.service';
import { StorageDisabledComponent } from './storage-disabled.component';
import { StorageDisabledListComponent } from './components/disabled/disabled.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [

  {
    path: '', component: StorageDisabledComponent, outlet: 'products-storage-disabled'
  }
];

@NgModule({
  declarations: [
    StorageDisabledComponent,
    StorageDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [StorageService]
})

export class StorageDisabledModule { }
