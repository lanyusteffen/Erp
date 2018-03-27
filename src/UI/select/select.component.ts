import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent {
  private _currentValue = {};

  @Input() options = [];
  @Input() placement = 'bottom';
  @Input() formSelect = false;
  @Input()
  set value(value) {
    this._currentValue = this.options.find(option => option.value === value) || {};
  }

  get value() {
    return this._currentValue;
  }
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  handleChange(value) {
    this.onChange.emit(value);
  }
}
