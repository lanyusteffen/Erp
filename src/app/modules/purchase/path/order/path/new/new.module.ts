import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '@UI/ui.module';
import { PurchaseOrderNewComponent } from './new.component';
import { BasicsModule } from '@modules/basics/basics.module';

export const ROUTES: Routes = [
  {
    path: '', component: PurchaseOrderNewComponent, outlet: 'purchase-order-new'
  }
];

@NgModule({
  declarations: [
    PurchaseOrderNewComponent
  ],
  imports: [
    UIModule,
    CommonModule,
    BasicsModule,
    RouterModule.forChild(ROUTES)
  ]
})

export class PurchaseOrderNewModule {}
