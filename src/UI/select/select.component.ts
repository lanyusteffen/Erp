import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

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
    this.cd.markForCheck();
  }

  get value() {
    return this._currentValue;
  }

  @Input()
  set label(label) {
    this._currentValue = this.options.find(option => option.label === label) || {};
    this.cd.markForCheck();
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {
  }

  handleChange(value) {
    this.onChange.emit(value);
    this.cd.markForCheck();
  }
}
