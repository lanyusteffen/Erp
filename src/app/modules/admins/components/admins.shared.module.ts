import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SharedModule } from '../../../shared.module';
import { MenuSelectorComponent } from '../components/menu-selector/menu-selector.component';


@NgModule({
    declarations: [
        MenuSelectorComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        MenuSelectorComponent
    ],
    providers: [
    ]
})

export class AdminsSharedModule {
}
