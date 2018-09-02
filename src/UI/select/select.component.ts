import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ui-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent {

  private _defaultValue = -1;
  private _defaultText = '请选择';

  private _defaultOption = {
    label: this._defaultText,
    value: this._defaultValue
  };

  private _currentValue = this._defaultOption;

  _options = [];

  @Input()
  set options(list) {
    this._options = list;
    this.cd.markForCheck();
  }

  get options() {
    return this._options;
  }

  @Input() placement = 'bottom';
  @Input() formSelect = false;

  @Input()
  set defaultValue(value) {
    this._defaultValue = value;
  }

  @Input()
  set defaultText(value) {
    this._defaultText = value;
  }

  @Input()
  set value(setNewValue) {
    if (this.options.length > 0) {
      const selectedValue = this.options.find(option => option.value === setNewValue) || null;
      if (selectedValue) {
        this._currentValue = selectedValue;
      } else {
        this._currentValue = this._defaultOption;
      }
      this.cd.markForCheck();
    }
  }

  get value() {
    return this._currentValue.value;
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {
  }

  handleChange(value) {
    this.onChange.emit(value);
    this.cd.markForCheck();
  }
}
