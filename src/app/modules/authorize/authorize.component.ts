import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizeService } from './authorize.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-basics-employee',
  template: `
  <app-employee-actions [selectedItems]="selectedItems" ></app-employee-actions>
  <div class="content">
    <app-employee-list (selectItems)="selectItems($event)"></app-employee-list>
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

export class AuthorizeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private authorizeService: AuthorizeService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.subscription = this.authorizeService
      .get().subscribe();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
