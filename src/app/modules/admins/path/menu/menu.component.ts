import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-menu',
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

export class MenuComponent {
  private selectedItems = <any>[];

  constructor(
  ) {}

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
