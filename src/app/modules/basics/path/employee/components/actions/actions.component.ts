import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
  selector: 'app-employee-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class EmployeeActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private employeeService: EmployeeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) { }

  show() {
    this._show = true;
    this.selectedId = 0;
  }


  showDisabled() {
    this.tabsService.create({
      name: '停用职员',
      link: '/home/basics/employee/disabled',
      outlet: 'basics-employee-disabled'
    });
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.employeeService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Employee, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.employeeService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.employeeService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Employee, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
