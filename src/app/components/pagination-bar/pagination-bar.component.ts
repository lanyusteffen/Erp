import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.less']
})

export class PaginationBarComponent {
  private _total = 0;
  private _size = 25;
  private items = 0;
  private options = [
    { label: '25 条／页', value: 25 },
    { label: '50 条／页', value: 50 },
    { label: '100 条／页', value: 100 }
  ];

  @Input() current = 1;
  @Input()
  set total(value: number) {
    this._total = value;
    this.getItems();
  }

  get total() {
    return this._total;
  }

  @Input()
  set size(value: number) {
    this._size = value;
    this.getItems();
  }

  get size() {
    return this._size;
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  getItems() {
    this.items = Math.ceil(this._total / this._size);
  }

  handleChange(page) {
    this.current = page;
    this.onChange.emit({ current: page, pageSize: this._size });
  }

  handleSizeChange(size) {
    this._size = size;
    this.onChange.emit({ current: 1, pageSize: size });
  }

  handleJumpPage(evt) {
    const page = parseInt(evt.target.value, 10);
    const nextPage = page > this.items ? this.items : page <= 0 ? 1 : page;

    this.onChange.emit({ current: nextPage, pageSize: this._size });
    evt.target.value = '';
  }
}
