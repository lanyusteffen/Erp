import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { CompanyDisabledListComponent } from './component/disabled/disabled.component';
import { CompanyDisabledComponent } from './company-disabled.component';
import { CompanyService } from './company.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: CompanyDisabledComponent, outlet: 'admins-company-disabled'
  }
];

@NgModule({
  declarations: [
    CompanyDisabledComponent,
    CompanyDisabledListComponent
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
    CompanyService
  ]
})

export class CompanyDisabledModule {}
