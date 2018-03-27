import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncomeTypeService } from './incometype.service';

@Component({
  selector: 'app-finances-incometype',
  template: `
    <app-incometype-actions [selectedItems]="selectedItems"></app-incometype-actions>
    <div class="content">
      <app-incometype-list (selectItems)="selectItems($event)"></app-incometype-list>
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

export class IncomeTypeComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;

  constructor(
    private incomeTypeService: IncomeTypeService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
}
