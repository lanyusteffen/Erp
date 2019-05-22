import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from './role.service';

@Component({
  selector: 'app-admin-role',
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

export class RoleComponent implements OnInit, OnDestroy {
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
