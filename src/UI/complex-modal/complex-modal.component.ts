import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ui-complex-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './complex-modal.component.html',
  styleUrls: ['./complex-modal.component.less']
})
export class ComplexModalComponent {
  @Input() show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClose() {
    this.onClose.emit();
  }
}
