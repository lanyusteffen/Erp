import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './component/list/list.component';
import { CompanyActionsComponent } from './component/actions/actions.component';
import { CompanyControlComponent } from './component/control/control.component';
import { CompanyService } from './company.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: CompanyComponent, outlet: 'admin-company'
  }
];

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyActionsComponent,
    CompanyControlComponent
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
  providers: [CompanyService]
})

export class CompanyModule {}
