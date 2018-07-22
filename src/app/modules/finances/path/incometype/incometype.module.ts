import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { IncomeTypeComponent } from './incometype.component';
import { IncomeTypeListComponent } from './component/list/list.component';
import { IncomeTypeActionsComponent } from './component/actions/actions.component';
import { IncomeTypeControlComponent } from './component/control/control.component';
import { IncomeTypeDisabledComponent } from './incometype-disabled.component';
import { IncomeTypeDisabledListComponent } from './component/disabled/disabled.component';

import { IncomeTypeService } from './incometype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule } from '@app/shared.module';
import { IncomeTypeRoutingModule } from './incometype.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    IncomeTypeComponent,
    IncomeTypeListComponent,
    IncomeTypeActionsComponent,
    IncomeTypeControlComponent,
    IncomeTypeDisabledComponent,
    IncomeTypeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    IncomeTypeRoutingModule
  ],
  providers: [ IncomeTypeService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class IncomeTypeModule {
}
