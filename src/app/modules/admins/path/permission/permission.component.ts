import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-permission',
  template: `
  <app-permission-actions [selectedItems]="selectedItems"></app-permission-actions>
  <div class="content">
    <app-permission-list (selectItems)="selectItems($event)"></app-permission-list>
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
export class PermissionComponent {

  private selectedItems = <any>[];

  constructor(
  ) {}

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
