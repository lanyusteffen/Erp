import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { DepartmentSelectorComponent } from './department-selector/department-selector.component';
import { DepartmentService } from '../path/department/department.service';

@NgModule({
  declarations: [
    DepartmentSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [ DepartmentSelectorComponent ],
  providers: [ DepartmentService ]
})

export class DepartmentSharedModule {
}
