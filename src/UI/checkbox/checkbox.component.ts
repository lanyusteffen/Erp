import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-checkbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})

export class CheckboxComponent {
  @Input() checked = false;
  @Input() inline = true;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  handleChange(evt) {
    this.onChange.emit(evt);
  }
}
