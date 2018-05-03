import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './component/list/list.component';
import { RoleActionsComponent } from './component/actions/actions.component';
import { RoleControlComponent } from './component/control/control.component';
import { RoleService } from './role.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { EmployeeModule } from '../../../basics/path/employee/employee.module';

export const ROUTES: Routes = [
  {
    path: '', component: RoleComponent, outlet: 'admin-role'
  }
];

@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleActionsComponent,
    RoleControlComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    EmployeeModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [RoleService]
})

export class RoleModule {}
