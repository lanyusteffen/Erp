import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-permission',
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
export class PermissionComponent implements OnInit, OnDestroy {

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
