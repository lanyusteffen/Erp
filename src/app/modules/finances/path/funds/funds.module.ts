import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { FundsComponent } from './funds.component';
import { FundsListComponent } from './component/list/list.component';
import { FundsActionsComponent } from './component/actions/actions.component';
import { FundsControlComponent } from './component/control/control.component';
import { FundsService } from './funds.service';
import { FormService } from '@services/form.service';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: FundsComponent, outlet: 'finances-funds'
  }
];

@NgModule({
  declarations: [
    FundsComponent,
    FundsListComponent,
    FundsActionsComponent,
    FundsControlComponent
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
  providers: [FundsService]
})

export class FundsModule {}
