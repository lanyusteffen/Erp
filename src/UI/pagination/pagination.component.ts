import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-pagination',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})

export class PaginationComponent {
  pageButtons = [];
  _items = 0;
  _activePage = 1;

  @Input() maxButtons = 0;
  @Input() boundaryLinks = false;
  @Input() ellipsis = false;
  @Input() prev = false;
  @Input() next = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Input()
  set items(value: number) {
    this._items = value;
    this._renderPageButtons();
  }

  get items() {
    return this._items;
  }

  @Input()
  set activePage(value: number) {
    this._activePage = value;
    this._renderPageButtons();
  }

  get activePage() {
    return this._activePage;
  }

  _renderPageButtons() {
    let startPage;
    let endPage;
    const _pageButtons = [];

    if (this.maxButtons && this.maxButtons < this._items) {
      startPage = Math.max(
        Math.min(
          this._activePage - Math.floor(this.maxButtons / 2),
          this._items - this.maxButtons + 1
        ),
        1
      );
      endPage = startPage + this.maxButtons - 1;
    } else {
      startPage = 1;
      endPage = this._items;
    }

    for (let page = startPage; page <= endPage; ++page) {
      _pageButtons.push({
        page,
        active: page === this._activePage
      });
    }

    if (this.ellipsis && this.boundaryLinks && startPage > 1) {
      if (startPage > 2) {
        _pageButtons.unshift({
          page: '...',
          disabled: true,
          ellipsis: true
        });
      }

      _pageButtons.unshift({
        page: 1,
        active: false
      });
    }

    if (this.ellipsis && endPage < this._items) {
      if (!this.boundaryLinks || endPage < this._items - 1) {
        _pageButtons.push({
          page: '...',
          disabled: true,
          ellipsis: true
        });
      }

      if (this.boundaryLinks) {
        _pageButtons.push({
          page: this._items,
          active: false
        });
      }
    }

    this.pageButtons = _pageButtons;
  }

  handleChange(page) {
    this.onChange.emit(page);
  }
}
