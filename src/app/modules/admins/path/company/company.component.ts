import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-admin-company',
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

export class CompanyComponent implements OnInit, OnDestroy {
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
