import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { EmployeeService } from '../path/employee/employee.service';
import { EmployeeSelectorComponent } from './employee-selector/employee-selector.component';

@NgModule({
  declarations: [
    EmployeeSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [ EmployeeSelectorComponent ],
  providers: [ EmployeeService ]
})

export class EmployeeSharedModule { }
