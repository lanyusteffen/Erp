import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-company',
  template: `
    <app-company-actions [selectedItems]="selectedItems"></app-company-actions>
    <div class="content">
      <app-company-list (selectItems)="selectItems($event)"></app-company-list>
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

export class CompanyComponent {
  private selectedItems = <any>[];

  constructor(
  ) {}

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
