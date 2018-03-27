import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { UIModule } from '@UI/ui.module';

import { AreaService } from './area.service';
import { AreaDisabledComponent } from './area-disabled.component';
import { AreaDisabledListComponent } from './components/disabled/disabled.component';
import { AppCommonModule } from '@modules/common/common.module';
import { SharedModule} from '@app/shared.module';

export const ROUTES: Routes = [
  
  {
    path: '', component: AreaDisabledComponent, outlet: 'basics-area-disabled'
  }
];

@NgModule({
  declarations: [
    AreaDisabledComponent,
    AreaDisabledListComponent
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
  exports: [],
  providers: [AreaService]
})

export class AreaDisabledModule {}
