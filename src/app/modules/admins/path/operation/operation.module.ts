import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { OperationComponent } from './operation.component';
import { OperationListComponent } from './components/list/list.component';
import { OperationActionsComponent } from './components/actions/actions.component';
import { OperationControlComponent } from './components/control/control.component';
import { OperationDisabledComponent } from './operation-disabled.component';
import { OperationDisabledListComponent } from './components/disabled/disabled.component';

import { OperationService } from './operation.service';
import { FormService } from '@services/form.service';

import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { OperationRoutingModule } from './operation.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';
import { AdminsSharedModule } from '../../components/admins.shared.module';


@NgModule({
  declarations: [
    OperationComponent,
    OperationListComponent,
    OperationActionsComponent,
    OperationControlComponent,
    OperationDisabledComponent,
    OperationDisabledListComponent,
    AdminsSharedModule
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicsSharedModule,
    SharedModule,
    OperationRoutingModule
  ],
  providers: [ OperationService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class OperationModule {}
