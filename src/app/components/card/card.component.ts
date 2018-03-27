import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})

export class CardComponent {
  @Input() header = '';
  @Input() show = false;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  handleCancel() {
    this.onCancel.emit();
  }
}
