﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent  } from './button/button.component';
import { DropdownComponent  } from './dropdown/dropdown.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { RadioComponent } from './radio/radio.component';
import { ComplexModalComponent } from './complex-modal/complex-modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    TableComponent,
    PaginationComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,
    AlertComponent,
    ModalComponent,
    ComplexModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    DropdownComponent,
    TableComponent,
    PaginationComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    AlertComponent,
    ModalComponent,
    ComplexModalComponent
  ]
})

export class UIModule { }
