import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { UIModule } from '@UI/ui.module';
import { SystemConfigComponent } from './systemconfig.component';
import { SystemConfigControlComponent } from './components/control/control.component';
import { SystemConfigService } from './systemconfig.service';
import { SharedModule} from '@app/shared.module';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { SystemConfigRoutingModule } from './systemconfig.router';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';

@NgModule({
  declarations: [
    SystemConfigComponent,
    SystemConfigControlComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicsSharedModule,
    SharedModule,
    SystemConfigRoutingModule,
    DpDatePickerModule
  ],
  providers: [ SystemConfigService, { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy } ]
})

export class SystemConfigModule {}
