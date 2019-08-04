import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { ReceiveNewComponent } from './new/new.component';
import { ReceiveListComponent } from './history/list/list.component';
import { ReceiveHistoryComponent } from './history/history.component';
import { ReceiveActionsComponent } from './history/actions/actions.component';

import { ReceiveService } from './receive.service';

import { SharedModule } from '@app/shared.module';
import { ReceiveRoutingModule } from './receive.router';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';
import { ProductsSharedModule } from '../../../products/components/products.shared.module';

@NgModule({
    declarations: [
        ReceiveNewComponent,
        ReceiveListComponent,
        ReceiveHistoryComponent,
        ReceiveActionsComponent
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
        ReceiveRoutingModule
    ],
    entryComponents: [
        DatePickerComponent
    ],
    providers: [ ReceiveService ]
})

export class ReceiveOrderModule {
}
