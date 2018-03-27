import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { IncomeTypeComponent } from './incometype.component';
import { IncomeTypeListComponent } from './component/list/list.component';
import { IncomeTypeActionsComponent } from './component/actions/actions.component';
import { IncomeTypeControlComponent } from './component/control/control.component';
import { IncomeTypeService } from './incometype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: IncomeTypeComponent, outlet: 'finances-incometype'
  }
];

@NgModule({
  declarations: [
    IncomeTypeComponent,
    IncomeTypeListComponent,
    IncomeTypeActionsComponent,
    IncomeTypeControlComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [IncomeTypeService]
})

export class IncomeTypeModule {}
