import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './component/list/list.component';
import { UserActionsComponent } from './component/actions/actions.component';
import { UserControlComponent } from './component/control/control.component';
import { UserService } from './user.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { EmployeeModule } from '../../../basics/path/employee/employee.module';

export const ROUTES: Routes = [
  {
    path: '', component: UserComponent, outlet: 'admin-user'
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserActionsComponent,
    UserControlComponent
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
  providers: [UserService]
})

export class UserModule {}
