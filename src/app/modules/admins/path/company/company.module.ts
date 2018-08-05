import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './components/list/list.component';
import { CompanyActionsComponent } from './components/actions/actions.component';
import { CompanyControlComponent } from './components/control/control.component';
import { CompanyDisabledComponent } from './company-disabled.component';
import { CompanyDisabledListComponent } from './components/disabled/disabled.component';

import { CompanyService } from './company.service';

import { SharedModule} from '@app/shared.module';
import { CompanyRoutingModule } from './company.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyActionsComponent,
    CompanyControlComponent,
    CompanyDisabledComponent,
    CompanyDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CompanyRoutingModule
  ],
  providers: [ CompanyService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class CompanyModule {}
