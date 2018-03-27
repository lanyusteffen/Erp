import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent {
  @Input() show = false;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  handleOnConfirm() {
    this.onConfirm.emit();
    this.onClose.emit();
  }

  handleOnClose() {
    this.onClose.emit();
  }
}
