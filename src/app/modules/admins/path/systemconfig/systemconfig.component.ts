import { Component } from '@angular/core';

@Component({
  selector: 'app-admins-systemconfig',
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

export class SystemConfigComponent {

  constructor(
  ) {}
}
