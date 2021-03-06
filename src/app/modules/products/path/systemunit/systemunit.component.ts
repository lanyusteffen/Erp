﻿import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemUnitService } from './systemunit.service';

@Component({
  selector: 'app-finances-systemunit',
  template: `
    <app-systemunit-actions [selectedItems]="selectedItems"></app-systemunit-actions>
    <div class="content">
      <app-systemunit-list (selectItems)="selectItems($event)"></app-systemunit-list>
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

export class SystemUnitComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private systemUnitService: SystemUnitService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
