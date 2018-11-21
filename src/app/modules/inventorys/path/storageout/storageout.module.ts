import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { StorageOutNewComponent } from './new/new.component';

import { StorageOutService } from './storageout.service';

import { SharedModule } from '@app/shared.module';
import { StorageOutRoutingModule } from './storageout.router';
import { BasicsSharedModule } from '../../../basics/components/basics.shared.module';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';
import { ProductsSharedModule } from '../../../products/components/products.shared.module';

@NgModule({
    declarations: [
        StorageOutNewComponent
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
        StorageOutRoutingModule
    ],
    entryComponents: [
        DatePickerComponent
    ],
    providers: [ StorageOutService ]
})

export class StorageOutModule {
}
