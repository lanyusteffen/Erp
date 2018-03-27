import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeeTypeService } from './feetype.service';

@Component({
  selector: 'app-finances-feetype',
  template: `
    <app-feetype-actions [selectedItems]="selectedItems"></app-feetype-actions>
    <div class="content">
      <app-feetype-list (selectItems)="selectItems($event)"></app-feetype-list>
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

export class FeeTypeComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private feeTypeService: FeeTypeService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
