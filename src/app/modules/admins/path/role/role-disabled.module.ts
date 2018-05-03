import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { RoleDisabledListComponent } from './component/disabled/disabled.component';
import { RoleDisabledComponent } from './role-disabled.component';
import { RoleService } from './role.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: RoleDisabledComponent, outlet: 'admins-role-disabled'
  }
];

@NgModule({
  declarations: [
    RoleDisabledComponent,
    RoleDisabledListComponent
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
    RoleService
  ]
})

export class RoleDisabledModule {}
