import { Component, enableProdMode, Input, Output, ViewEncapsulation, ElementRef, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const RADIO_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
};
enableProdMode();

@Component({
    selector: 'app-ui-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less'],
    providers: [RADIO_VALUE_ACCESSOR]
})

export class RadioComponent implements ControlValueAccessor {
    @Input() inline = true;
    @Input() checked = false;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() radioName: any;
    @Input() value: string;
    @Input() label: string;

    @ViewChild('rb') inputViewChild: ElementRef;
    @Output() pRadioChange: EventEmitter<any> = new EventEmitter();
    onModelChange: Function = () => { };

    constructor(
        private cd: ChangeDetectorRef
    ) { }

    // model view -> view value
    writeValue(value: any): void {
        if (value) {
            this.checked = (value === this.value);

            if (this.inputViewChild.nativeElement) {
                this.inputViewChild.nativeElement.checked = this.checked;
            }
            this.cd.markForCheck();
        }
    }

    // view value ->model value
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void { }

    handleClick() {
        this.select();
    }

    select() {
        if (this.checked) {
            this.inputViewChild.nativeElement.checked = !this.inputViewChild.nativeElement.checked;
            this.checked = !this.checked;
            if (this.checked) {
                this.onModelChange(this.value); // 同步view value 和 model value
            } else {
                this.onModelChange(null);
            }
            this.pRadioChange.emit(null);
        }
    }
}
