import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './component/list/list.component';
import { RoleActionsComponent } from './component/actions/actions.component';
import { RoleControlComponent } from './component/control/control.component';
import { RoleDisabledComponent } from './role-disabled.component';
import { RoleDisabledListComponent } from './component/disabled/disabled.component';

import { RoleService } from './role.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { EmployeeModule } from '../../../basics/path/employee/employee.module';
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
    AppCommonModule,
    EmployeeModule,
    SharedModule,
    RoleRoutingModule
  ],
  providers: [ RoleService ]
})

export class RoleModule {}
