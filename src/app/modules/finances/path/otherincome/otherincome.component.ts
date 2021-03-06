﻿import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtherIncomeService } from './otherincome.service';

@Component({
  selector: 'app-finances-otherincome',
  template: `
    <app-otherincome-actions [selectedItems]="selectedItems"></app-otherincome-actions>
    <div class="content">
      <app-otherincome-list (selectItems)="selectItems($event)"></app-otherincome-list>
    </div>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .content {
      flex: 1;
      display: flex;
    }
  `]
})

export class OtherIncomeComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private otherIncomeService: OtherIncomeService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
