import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from './employee.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-basics-employee',
  template: `
  <app-employee-actions [selectedItems]="selectedItems" ></app-employee-actions>
  <div class="content">
    <app-employee-list (selectItems)="selectItems($event)"></app-employee-list>
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

export class EmployeeComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private department;
  private subscription: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.subscription = this.employeeService
      .get()
      .subscribe(({ currentDepartment }) => {
        this.department = currentDepartment;
      });
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定职员列表失败!' + err
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  onDepartmentChange(selected) {
    this.employeeService.onDepartmentChange(selected, (err) => {
      this.listErrorCallBack(err);
    });
  }
}
