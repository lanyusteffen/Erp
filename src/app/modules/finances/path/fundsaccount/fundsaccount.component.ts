﻿import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FundsAccountService } from './fundsaccount.service';

@Component({
  selector: 'app-finances-fundsaccount',
  template: `
    <app-fundsaccount-actions [selectedItems]="selectedItems"></app-fundsaccount-actions>
    <div class="content">
      <app-fundsaccount-list (selectItems)="selectItems($event)"></app-fundsaccount-list>
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

export class FundsAccountComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private fundsAccountService: FundsAccountService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
