import { Component, Input, Output, EventEmitter } from '@angular/core';

const iconMap = {
  success: 'success',
  danger: 'wrong',
  info: 'information',
  warning: 'warning'
};

@Component({
  selector: 'app-ui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent {
  private _type: string;
  private icon: string;

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input()
  get type() {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    this.icon = iconMap[value];
  }

  handleClose() {
    this.onClose.emit();
  }
}
