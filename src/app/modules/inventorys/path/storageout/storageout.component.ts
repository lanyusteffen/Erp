import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageOutService } from './storageout.service';

@Component({
  selector: 'app-finances-storageout',
  template: `
    <app-storageout-actions [selectedItems]="selectedItems"></app-storageout-actions>
    <div class="content">
      <app-storageout-list (selectItems)="selectItems($event)"></app-storageout-list>
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

export class StorageOutComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private storageOutService: StorageOutService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
