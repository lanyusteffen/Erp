import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { PurchaseNewComponent } from './new/new.component';
import { PurchaseListComponent } from './history/list/list.component';
import { PurchaseHistoryComponent } from './history/history.component';
import { PurchaseActionsComponent } from './history/actions/actions.component';

import { PurchaseService } from './order.service';

import { SharedModule } from '@app/shared.module';
import { PurchaseRoutingModule } from './order.router';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';
import { ProductsSharedModule } from '../../../products/components/products.shared.module';

@NgModule({
    declarations: [
        PurchaseNewComponent,
        PurchaseListComponent,
        PurchaseHistoryComponent,
        PurchaseActionsComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicsSharedModule,
        ProductsSharedModule,
        SharedModule,
        DpDatePickerModule,
        PurchaseRoutingModule
    ],
    entryComponents: [
        DatePickerComponent
    ],
    providers: [ PurchaseService ]
})

export class PurchaseOrderModule {
}
