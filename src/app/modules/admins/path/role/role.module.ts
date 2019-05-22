import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { RoleComponent } from './role.component';
import { RoleListComponent } from './components/list/list.component';
import { RoleActionsComponent } from './components/actions/actions.component';
import { RoleControlComponent } from './components/control/control.component';
import { RoleDisabledComponent } from './role-disabled.component';
import { RoleDisabledListComponent } from './components/disabled/disabled.component';

import { RoleService } from './role.service';
import { FormService } from '@services/form.service';

import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { RoleRoutingModule } from './role.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

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
    BasicsSharedModule,
    SharedModule,
    RoleRoutingModule
  ],
  providers: [ RoleService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class RoleModule {}
