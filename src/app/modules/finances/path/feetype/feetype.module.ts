import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { FeeTypeComponent } from './feetype.component';
import { FeeTypeListComponent } from './component/list/list.component';
import { FeeTypeActionsComponent } from './component/actions/actions.component';
import { FeeTypeControlComponent } from './component/control/control.component';
import { FeeTypeDisabledComponent } from './feetype-disabled.component';
import { FeeTypeDisabledListComponent } from './component/disabled/disabled.component';

import { FeeTypeService } from './feetype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';
import { FeeTypeRoutingModule } from './feetype.router';

@NgModule({
  declarations: [
    FeeTypeComponent,
    FeeTypeListComponent,
    FeeTypeActionsComponent,
    FeeTypeControlComponent,
    FeeTypeDisabledComponent,
    FeeTypeDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    FeeTypeRoutingModule
  ],
  providers: [ FeeTypeService ]
})

export class FeeTypeModule {}
