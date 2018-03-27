import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
  private categories = <any>[];
  private selected = {};

  @Input() categoryType = 'Customer';
  @Input() resourceType = 'Supplier';

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService
      .get(this.categoryType, this.resourceType)
      .subscribe(data => {
        this.categories = this.parseCategory(data);
      });
  }

  private loop(target, source) {
    return target.map(item => {
      if (source[item.Id]) {
        item.subCategories = source[item.Id];

        this.loop(item.subCategories, source);
      }

      return item;
    });
  }

  private parseCategory(services) {
    const groupedList = services.reduce((value, currentValue) => {
      if (!value[currentValue.ParentId]) {
        value[currentValue.ParentId] = [];
      }

      value[currentValue.ParentId].push(currentValue);

      return value;
    }, {});

    return this.loop(groupedList['0'], groupedList);
  }

  private handleChange(selected) {
    this.selected = selected;
    this.onChange.emit(selected);
  }
}
