import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { StorageService } from './storage.service';
import { StorageComponent } from './storage.component';
import { StorageListComponent } from './components/list/list.component';
import { StorageActionsComponent } from './components/actions/actions.component';
import { StorageControlComponent } from './components/control/control.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: StorageComponent, outlet: 'products-storage'
  }
];

@NgModule({
  declarations: [
    StorageComponent,
    StorageListComponent,
    StorageActionsComponent,
    StorageControlComponent,
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

export class StorageModule { }
