import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-admin-user',
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

export class UserComponent implements OnInit, OnDestroy {
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
