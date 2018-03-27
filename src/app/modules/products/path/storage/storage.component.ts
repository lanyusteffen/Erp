import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './storage.service';


@Component({
  selector: 'app-products-storage',
  template: `
  <app-storage-actions [selectedItems]="selectedItems" ></app-storage-actions>
  <div class="content">    
    <app-storage-list (selectItems)="selectItems($event)"></app-storage-list>
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

export class StorageComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private department;
  private subscription: Subscription;

  constructor(
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.subscription = this.storageService
      .get()
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
