import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-role',
  template: `
    <app-role-actions [selectedItems]="selectedItems"></app-role-actions>
    <div class="content">
      <app-role-list (selectItems)="selectItems($event)"></app-role-list>
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

export class RoleComponent {
  private selectedItems = <any>[];

  constructor(
  ) {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
