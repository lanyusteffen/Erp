import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SharedModule } from '../../../shared.module';
import { StorageBillTypeSelectorComponent } from '../components/storagebilltype-Selector/storagebilltype-Selector.component';


@NgModule({
    declarations: [
        StorageBillTypeSelectorComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        StorageBillTypeSelectorComponent
    ],
    providers: [
    ]
})

export class InventorysSharedModule {
}
