import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-ui-radio',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.less']
})

export class RadioComponent {
    @Input() inline = true;
    @Input() checked = false;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() radioName: any;
    @Input() value: string;

    handleChange(evt) {
        this.checked = true;
        console.log(this.value);
        this.onChange.emit(evt);
    }
}
