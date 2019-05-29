import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-user',
  template: `
    <app-user-actions [selectedItems]="selectedItems"></app-user-actions>
    <div class="content">
      <app-user-list (selectItems)="selectItems($event)"></app-user-list>
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

export class UserComponent {
  private selectedItems = <any>[];

  constructor(
  ) {}

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
