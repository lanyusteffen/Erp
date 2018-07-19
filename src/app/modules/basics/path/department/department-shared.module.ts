import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { DepartmentSelectorComponent } from './components/department-selector/department-selector.component';
import { DepartmentService } from './department.service';

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
