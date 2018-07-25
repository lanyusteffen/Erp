import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './components/list/list.component';
import { UserActionsComponent } from './components/actions/actions.component';
import { UserControlComponent } from './components/control/control.component';
import { UserModifyComponent } from './components/modify/modify.component';
import { UserPasswordComponent } from './components/password/password.component';
import { UserDisabledComponent } from './user-disabled.component';
import { UserDisabledListComponent } from './components/disabled/disabled.component';

import { UserService } from './user.service';
import { FormService } from '@services/form.service';

import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { UserRoutingModule } from './user.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

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
    BasicsSharedModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [ UserService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class UserModule {}
