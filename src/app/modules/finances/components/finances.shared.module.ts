import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { FundsAccountSelectorComponent } from '../components/fundsaccount.component-selector/fundsaccount-selector.component';

import { FundsAccountService } from '../path/fundsaccount/fundsaccount.service';
import { SharedModule } from '../../../shared.module';


@NgModule({
  declarations: [
    FundsAccountSelectorComponent,
  ],
  imports: [
    UIModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    FundsAccountSelectorComponent,
  ],
  providers: [
    FundsAccountService
  ]
})

export class FinancesSharedModule {
}
