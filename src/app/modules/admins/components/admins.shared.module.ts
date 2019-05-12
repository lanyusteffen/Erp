import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';

import { SharedModule } from '../../../shared.module';
import { MenuSelectorComponent } from '../components/menu-selector/menu-selector.component';
import { CompanySelectorComponent } from './company-selector/company-selector.component';
import { ModuleSelectorComponent } from './module-selector/module-selector.component';
import { RoleSelectorComponent } from './role-selector/role-selector.component';


@NgModule({
    declarations: [
        MenuSelectorComponent,
        CompanySelectorComponent,
        ModuleSelectorComponent,
        RoleSelectorComponent
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
        RoleSelectorComponent
    ],
    providers: [
    ]
})

export class AdminsSharedModule {
}
