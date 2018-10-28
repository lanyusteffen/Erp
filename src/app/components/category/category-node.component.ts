import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-node',
  template: `
    <li *ngFor="let item of categories" [class.active]="selected!=undefined && item!=undefined && selected.Id === item.Id">
      <span class="iconfont icon-more"></span>
      <span class="iconfont icon-form"></span>
      <a (click)="handleSelect(item)">{{item.Name}}</a>
      <ul *ngIf="item.subCategories">
        <app-category-node [categories]="item.subCategories" (onChange)="handleChange($event)">
        </app-category-node>
      </ul>
    </li>
  `
})

export class CategoryNodeComponent {
  @Input() categories = [];
  @Input() selected: {};
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  private handleSelect(selected) {
    this.selected = selected;
    this.onChange.emit(selected);
  }

  private handleChange(evt) {
    this.onChange.emit(evt);
  }
}
