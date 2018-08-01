import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { AreaComponent } from './area.component';
import { AreaListComponent } from './components/list/list.component';
import { AreaActionsComponent } from './components/actions/actions.component';
import { AreaControlComponent } from './components/control/control.component';
import { AreaDisabledComponent } from './area-disabled.component';
import { AreaDisabledListComponent } from './components/disabled/disabled.component';

import { AreaService } from './area.service';

import { SharedModule } from '@app/shared.module';
import { AreaRoutingModule } from './area.router';

@NgModule({
  declarations: [
    AreaComponent,
    AreaListComponent,
    AreaActionsComponent,
    AreaControlComponent,
    AreaDisabledComponent,
    AreaDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AreaRoutingModule
  ],
  providers: [ AreaService]
})

export class AreaModule {
}
