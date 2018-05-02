import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { UserDisabledListComponent } from './component/disabled/disabled.component';
import { UserDisabledComponent } from './user-disabled.component';
import { UserService } from './user.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: UserDisabledComponent, outlet: 'admins-user-disabled'
  }
];

@NgModule({
  declarations: [
    UserDisabledComponent,
    UserDisabledListComponent
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
    UserService
  ]
})

export class UserDisabledModule {}
