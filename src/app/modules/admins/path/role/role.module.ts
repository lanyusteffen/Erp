import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { RoleComponent } from './role.component';
import { RoleListComponent } from './components/list/list.component';
import { RoleActionsComponent } from './components/actions/actions.component';
import { RoleControlComponent } from './components/control/control.component';
import { RoleDisabledComponent } from './role-disabled.component';
import { RoleDisabledListComponent } from './components/disabled/disabled.component';

import { RoleService } from './role.service';

import { SharedModule } from '@app/shared.module';
import { AdminsSharedModule } from '../../../admins/components/admins.shared.module';
import { RoleRoutingModule } from './role.router';

@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleActionsComponent,
    RoleControlComponent,
    RoleDisabledComponent,
    RoleDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminsSharedModule,
    SharedModule,
    RoleRoutingModule
  ],
  providers: [
    RoleService
  ]
})

export class RoleModule {
}
