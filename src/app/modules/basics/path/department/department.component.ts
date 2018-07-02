import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from './department.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-basics-department',
  template: `
    <app-department-actions [selectedItems]="selectedItems"  [category]="selectCategory"></app-department-actions>
    <div class="content">
      <app-category
        [categoryType]="'Department'"
        [resourceType]="''"
        (onChange)="onCategoryChange($event)"
      ></app-category>
      <app-department-list (selectItems)="selectItems($event)"></app-department-list>
    </div>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      display: flex;
    }
  `]
})

export class DepartmentComponent implements OnInit, OnDestroy {

  private selectedItems = <any>[];
  private subscription: Subscription;
  private selectedCategory: any;

  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.subscription = this.departmentService
      .get()
      .subscribe(({ currentCategory }) => {
        this.selectedCategory = currentCategory;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  onCategoryChange(selected) {
    this.departmentService.onCategoryChange(selected, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定部门列表失败, ' + err
      });
    });
  }
}
