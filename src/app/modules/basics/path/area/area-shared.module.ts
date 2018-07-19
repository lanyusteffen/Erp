import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@UI/ui.module';
import { AreaSelectorComponent } from './components/area-selector/area-selector.component';
import { AreaService } from './area.service';

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
