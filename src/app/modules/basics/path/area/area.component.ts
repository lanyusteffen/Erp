import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from './area.service';


@Component({
  selector: 'app-basics-area',
  template: `
  <app-area-actions [selectedItems]="selectedItems" ></app-area-actions>
  <div class="content">
    <app-area-list (selectItems)="selectItems($event)"></app-area-list>
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

export class AreaComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private department;
  private subscription: Subscription;

  constructor(
    private areaService: AreaService
  ) {
  }

  ngOnInit() {
    this.subscription = this.areaService
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
