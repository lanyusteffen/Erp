import { Component, Input, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef, forwardRef, enableProdMode } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};
enableProdMode();

@Component({
  selector: 'app-ui-checkbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  providers: [CHECKBOX_VALUE_ACCESSOR]
})

export class CheckboxComponent implements ControlValueAccessor {

  @Input() checked = false;
  @Input() inline = true;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('cb') inputViewChild: ElementRef;
  @Output() pRadioChange: EventEmitter<any> = new EventEmitter();
  onModelChange: Function = () => { };


  constructor(
    private cd: ChangeDetectorRef
  ) { }

  writeValue(obj: any): void {

    if (this.inputViewChild.nativeElement) {
      this.inputViewChild.nativeElement.checked = this.checked;
    }
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  handleChange(evt) {
    this.select();
  }

  select() {
    this.onModelChange(this.checked);
    this.pRadioChange.emit(this.checked);
  }
}
