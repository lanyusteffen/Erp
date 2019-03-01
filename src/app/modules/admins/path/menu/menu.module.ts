import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '@UI/ui.module';

import { MenuComponent } from './menu.component';
import { MenuListComponent } from './components/list/list.component';
import { MenuActionsComponent } from './components/actions/actions.component';
import { MenuControlComponent } from './components/control/control.component';
import { MenuModifyComponent } from './components/modify/modify.component';
import { MenuDisabledComponent } from './menu-disabled.component';
import { MenuDisabledListComponent } from './components/disabled/disabled.component';

import { MenuService } from './menu.service';
import { FormService } from '@services/form.service';

import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { MenuRoutingModule } from './menu.router';

import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@NgModule({
  declarations: [
    MenuComponent,
    MenuListComponent,
    MenuActionsComponent,
    MenuControlComponent,
    MenuModifyComponent,
    MenuDisabledComponent,
    MenuDisabledListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicsSharedModule,
    SharedModule,
    MenuRoutingModule
  ],
  providers: [ MenuService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class MenuModule {}
