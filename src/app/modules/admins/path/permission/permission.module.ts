import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PermissionComponent } from './permission.component';
import { PermissionListComponent } from './components/list/list.component';
import { PermissionActionsComponent } from './components/actions/actions.component';
import { PermissionControlComponent } from './components/control/control.component';
import { PermissionDisabledComponent } from './permission-disabled.component';
import { PermissionDisabledListComponent } from './components/disabled/disabled.component';

import { UIModule } from '@UI/ui.module';

import { PermissionService } from './permission.service';

import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { PermissionRoutingModule } from './permission.router';
import { AdminsSharedModule } from '../../components/admins.shared.module';

@NgModule({
  declarations: [
    PermissionComponent,
    PermissionDisabledComponent,
    PermissionActionsComponent,
    PermissionControlComponent,
    PermissionDisabledListComponent,
    PermissionListComponent,
    AdminsSharedModule
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicsSharedModule,
    SharedModule,
    PermissionRoutingModule
  ],
  providers: [
    PermissionService
  ]
})

export class RoleModule {}
