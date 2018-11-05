import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { StorageOutComponent } from './storageout.component';

import { StorageOutService } from './storageout.service';
import { SharedModule } from '@app/shared.module';
import { StorageOutRoutingModule } from './storageout.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    StorageOutComponent
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
