import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { DepartmentSelectorComponent } from './components/department-selector/department-selector.component';

@NgModule({
  declarations: [
    DepartmentSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [ DepartmentSelectorComponent ]
})

export class DepartmentSharedModule {
}
