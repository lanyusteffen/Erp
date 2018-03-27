import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { FeeTypeComponent } from './feetype.component';
import { FeeTypeListComponent } from './component/list/list.component';
import { FeeTypeActionsComponent } from './component/actions/actions.component';
import { FeeTypeControlComponent } from './component/control/control.component';
import { FeeTypeService } from './feetype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: FeeTypeComponent, outlet: 'finances-feetype'
  }
];

@NgModule({
  declarations: [
    FeeTypeComponent,
    FeeTypeListComponent,
    FeeTypeActionsComponent,
    FeeTypeControlComponent
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
  providers: [FeeTypeService]
})

export class FeeTypeModule {}
