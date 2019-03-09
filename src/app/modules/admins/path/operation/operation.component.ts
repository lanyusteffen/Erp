import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-admin-operation',
  template: `
    <app-operation-actions [selectedItems]="selectedItems"></app-operation-actions>
    <div class="content">
      <app-operation-list (selectItems)="selectItems($event)"></app-operation-list>
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

export class OperationComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private operationService: OperationService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
