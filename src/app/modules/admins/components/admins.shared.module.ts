import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SharedModule } from '../../../shared.module';
import { MenuSelectorComponent } from '../components/menu-selector/menu-selector.component';
import { ButtonTypeSelectorComponent } from '../components/buttontype-selector/buttontype-selector.component';
import { CompanySelectorComponent } from './company-selector/company-selector.component';


@NgModule({
    declarations: [
        MenuSelectorComponent,
        ButtonTypeSelectorComponent,
        CompanySelectorComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        MenuSelectorComponent,
        ButtonTypeSelectorComponent,
        CompanySelectorComponent
    ],
    providers: [
    ]
})

export class AdminsSharedModule {
}
