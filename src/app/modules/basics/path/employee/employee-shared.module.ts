import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '@UI/ui.module';

import { EmployeeSelectorComponent } from './components/employee-selector/employee-selector.component';

@NgModule({
  declarations: [
    EmployeeSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [ EmployeeSelectorComponent ]
})

export class EmployeeSharedModule { }
