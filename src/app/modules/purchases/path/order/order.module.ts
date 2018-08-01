import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { PurchaseOrderNewComponent } from './new/new.component';

import { PurchaseOrderService } from './order.service';

import { SharedModule } from '@app/shared.module';
import { PurchaseOrderRoutingModule } from './order.router';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';

@NgModule({
    declarations: [
        PurchaseOrderNewComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicsSharedModule,
        SharedModule,
        DpDatePickerModule,
        PurchaseOrderRoutingModule
    ],
    entryComponents: [
        DatePickerComponent
    ],
    providers: [ PurchaseOrderService ]
})

export class PurchaseOrderModule {
}
