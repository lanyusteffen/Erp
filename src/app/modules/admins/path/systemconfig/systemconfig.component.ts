import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-systemconfig',
  template: `
    <div class="content">
      <app-systemconfig-control></app-systemconfig-control>
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

export class SystemConfigComponent implements OnInit, OnDestroy {

  constructor(
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
