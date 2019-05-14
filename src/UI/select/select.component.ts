import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ui-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent {

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  private _defaultValue = -1;
  private _defaultText = '请选择';
  private isLabelDirty: Boolean = false;

  @Input()
  private useDefault = true;

  private _defaultOption = {
    label: this._defaultText,
    value: this._defaultValue
  };

  _options = [];

  private _currentValue = this.useDefault ?
              this._defaultOption.value : null;
  private _currentLabel = this.useDefault ?
              this._defaultOption.label : '';

  @Input()
  set options(list) {
    this._options = list;
    this.setValueInternal();
    this.cd.markForCheck();
  }

  get options() {
    return this._options;
  }

  @Input() private placement = 'bottom';
  @Input() private formSelect = false;
  @Input() private shown = true;

  @Input()
  set defaultValue(value) {
    this._defaultValue = value;
  }

  @Input()
  set defaultText(value) {
    this._defaultText = value;
  }

  private setLabelInternal() {
    const selectedOption = this.options.find(option => option.value === this._currentValue) || null;
    if (selectedOption) {
      this._currentLabel = selectedOption.label;
    }
  }

  private setValueInternal() {
    if (this.options.length > 0) {
      if (this._currentValue) {
        this.setLabelInternal();
        this.cd.markForCheck();
      }
    }
  }

  @Input()
  set value(value) {
    this._currentValue = value;
    this.isLabelDirty = true;
    this.setValueInternal();
  }

  get label() {
    if (this.isLabelDirty) {
      this.setLabelInternal();
      this.isLabelDirty = false;
    }
    return this._currentLabel;
  }

  get value() {
    return this._currentValue;
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  handleChange(value) {
    this._currentValue = value;
    this.isLabelDirty = true;
    this.onChange.emit(value);
    this.cd.markForCheck();
  }
}
