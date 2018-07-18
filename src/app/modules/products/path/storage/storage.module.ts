import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { StorageComponent } from './storage.component';
import { StorageListComponent } from './components/list/list.component';
import { StorageActionsComponent } from './components/actions/actions.component';
import { StorageControlComponent } from './components/control/control.component';
import { StorageDisabledComponent } from './storage-disabled.component';
import { StorageDisabledListComponent } from './components/disabled/disabled.component';

import { StorageService } from './storage.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { StorageRoutingModule } from './storage.router';

@NgModule({
  declarations: [
    StorageComponent,
    StorageListComponent,
    StorageActionsComponent,
    StorageControlComponent,
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
    StorageRoutingModule
  ],
  exports: [],
  providers: [ StorageService ]
})

export class StorageModule {
}
