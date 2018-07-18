import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './component/list/list.component';
import { UserActionsComponent } from './component/actions/actions.component';
import { UserControlComponent } from './component/control/control.component';
import { UserModifyComponent } from './component/modify/modify.component';
import { UserPasswordComponent } from './component/password/password.component';
import { UserDisabledComponent } from './user-disabled.component';
import { UserDisabledListComponent } from './component/disabled/disabled.component';

import { UserService } from './user.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { EmployeeSharedModule } from '../../../basics/path/employee/employee-shared.module';
import { UserRoutingModule } from './user.router';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserActionsComponent,
    UserControlComponent,
    UserModifyComponent,
    UserPasswordComponent,
    UserDisabledComponent,
    UserDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    EmployeeSharedModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [ UserService ]
})

export class UserModule {}
