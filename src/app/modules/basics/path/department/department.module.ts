import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { DepartmentService } from './department.service';
import { DepartmentSelectorComponent } from './components/department-selector/department-selector.component';
import { DepartmentComponent } from './department.component';
import { DepartmentActionsComponent} from './components/actions/actions.component';
import { DepartmentListComponent } from './components/list/list.component';
import { DepartmentControlComponent } from './components/control/control.component';

import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: DepartmentComponent, outlet: 'basics-department'
  }
];


@NgModule({
  declarations: [
    DepartmentSelectorComponent,
    DepartmentComponent,
    DepartmentActionsComponent,
    DepartmentControlComponent,
    DepartmentListComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [DepartmentSelectorComponent],
  providers: [DepartmentService]
})

export class DepartmentModule {}
