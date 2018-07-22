import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { AreaSelectorComponent } from './area-selector/area-selector.component';
import { AreaService } from '../path/area/area.service';

@NgModule({
  declarations: [
    AreaSelectorComponent
  ],
  imports: [
    UIModule,
    CommonModule
  ],
  exports: [ AreaSelectorComponent ],
  providers: [ AreaService ]
})

export class AreaSharedModule {
}
