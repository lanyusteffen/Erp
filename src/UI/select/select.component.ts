import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ui-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent {

  private _currentValue = {};
  private _selectedValue = null;

  _options = [];

  @Input()
  set options(list) {
    this._options = list;
    if (this._selectedValue === null || this._selectedValue === undefined) {
      this._currentValue = this.options[0];
    } else {
      this._currentValue = this.options.find(option => option.value === this._selectedValue) || {};
    }
    this._selectedValue = null;
    this.cd.markForCheck();
  }
  get options() {
    return this._options;
  }
  @Input() placement = 'bottom';
  @Input() formSelect = false;

  @Input()
  set value(value) {
    if (this.options.length > 0) {
      this._currentValue = this.options.find(option => option.value === value) || {};
      this._selectedValue = null;
      this.cd.markForCheck();
    } else {
      this._selectedValue = value;
    }
  }

  get value() {
    return this._currentValue;
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {
  }

  handleChange(value) {
    this.onChange.emit(value);
    this.cd.markForCheck();
  }
}
