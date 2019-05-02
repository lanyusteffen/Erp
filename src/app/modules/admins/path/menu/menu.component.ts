import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-admin-menu',
  template: `
    <app-menu-actions [selectedItems]="selectedItems"></app-menu-actions>
    <div class="content">
      <app-menu-list (selectItems)="selectItems($event)"></app-menu-list>
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

export class MenuComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];

  constructor(
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
