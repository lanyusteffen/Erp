import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { StorageOutComponent } from './storageout.component';
import { StorageOutListComponent } from './components/list/list.component';
import { StorageOutActionsComponent } from './components/actions/actions.component';
import { StorageOutControlComponent } from './components/control/control.component';
import { StorageOutDisabledComponent } from './storageout-disabled.component';
import { StorageOutDisabledListComponent } from './components/disabled/disabled.component';

import { StorageOutService } from './storageout.service';
import { SharedModule } from '@app/shared.module';
import { StorageOutRoutingModule } from './storageout.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    StorageOutComponent,
    StorageOutListComponent,
    StorageOutActionsComponent,
    StorageOutControlComponent,
    StorageOutDisabledComponent,
    StorageOutDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StorageOutRoutingModule
  ],
  providers: [ StorageOutService ]
})

export class StorageOutModule {
}
