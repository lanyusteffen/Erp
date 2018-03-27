import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-node',
  template: `
    <li *ngFor="let item of categories" [class.active]="selected.Id === item.Id">
      <span class="iconfont icon-more"></span>
      <span class="iconfont icon-form"></span>
      <a (click)="handleSelect(item)">{{item.Name}}</a>
      <ul *ngIf="item.subCategories">
        <app-category-node [categories]="item.subCategories" (onChange)="onSelect($event)">
        </app-category-node>
      </ul>
    </li>
  `
})

export class CategoryNodeComponent {
  @Input() categories = [];
  @Input() onSelect: Function;
  @Input() selected: {};
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  private handleSelect(item) {
    this.onChange.emit(item);
  }
}
