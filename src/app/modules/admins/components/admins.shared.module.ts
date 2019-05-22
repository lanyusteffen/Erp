import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SharedModule } from '../../../shared.module';
import { MenuSelectorComponent } from '../components/menu-selector/menu-selector.component';
import { CompanySelectorComponent } from './company-selector/company-selector.component';
import { ModuleSelectorComponent } from './module-selector/module-selector.component';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { ButtonStyleSelectorComponent } from './button-style-selector/button-style-selector.component';


@NgModule({
    declarations: [
        MenuSelectorComponent,
        CompanySelectorComponent,
        ModuleSelectorComponent,
        RoleSelectorComponent,
        ButtonStyleSelectorComponent
    ],
    imports: [
        UIModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        MenuSelectorComponent,
        CompanySelectorComponent,
        ModuleSelectorComponent,
        RoleSelectorComponent,
        ButtonStyleSelectorComponent
    ],
    providers: [
    ]
})

export class AdminsSharedModule {
}
