import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})

export class ButtonComponent {
  @Input() type = 'button';
  @Input() style = 'default';
  @Input() disabled = false;
}
