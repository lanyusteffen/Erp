import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {
  @Input() show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClose() {
    this.onClose.emit();
  }
}
