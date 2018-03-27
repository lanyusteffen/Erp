import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { AreaService } from './area.service';
import { AreaSelectorComponent } from './components/area-selector/area-selector.component';
import { AreaComponent } from './area.component';
import { AreaListComponent } from './components/list/list.component';
import { AreaActionsComponent } from './components/actions/actions.component';
import { AreaControlComponent } from './components/control/control.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  {
    path: '', component: AreaComponent, outlet: 'basics-area'
  }
];

@NgModule({
  declarations: [
    AreaSelectorComponent,
    AreaComponent,
    AreaListComponent,
    AreaActionsComponent,
    AreaControlComponent
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
  exports: [AreaSelectorComponent],
  providers: [AreaService]
})

export class AreaModule {}
