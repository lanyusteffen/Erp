import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { SaleNewComponent } from './new/new.component';
import { SaleListComponent } from './history/list/list.component';
import { SaleHistoryComponent } from './history/history.component';
import { SaleActionsComponent } from './history/actions/actions.component';

import { SalesService } from './order.service';

import { SharedModule } from '@app/shared.module';
import { SaleRoutingModule } from './order.router';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';
import { ProductsSharedModule } from '../../../products/components/products.shared.module';

@NgModule({
    declarations: [
        SaleNewComponent,
        SaleListComponent,
        SaleHistoryComponent,
        SaleActionsComponent
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
        SaleRoutingModule
    ],
    entryComponents: [
        DatePickerComponent
    ],
    providers: [ SalesService ]
})

export class SaleOrderModule {
}
