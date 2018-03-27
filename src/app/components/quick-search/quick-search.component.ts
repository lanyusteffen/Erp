import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: [
    './quick-search.component.less'
  ]
})

export class QuickSearchComponent {
  @Input() placeholder: String = '请输入关键字搜索';
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  handleSearch(evt) {
    this.onSearch.emit(evt.target.value);
  }
}
