import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { FeeTypeDisabledListComponent } from './component/disabled/disabled.component';
import { FeeTypeDisabledComponent } from './feetype-disabled.component';
import { FeeTypeService } from './feetype.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: FeeTypeDisabledComponent, outlet: 'finances-feetype-disabled'
  }
];

@NgModule({
  declarations: [
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
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    FeeTypeService
  ]
})

export class FeeTypeDisabledModule {}
