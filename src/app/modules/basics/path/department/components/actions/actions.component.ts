import { Component, Input } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
  selector: 'app-department-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class DepartmentActionsComponent {
  private _show = false;
  private selectedId: number;
  private _category: any;
  private selectCategory: any;

  @Input() selectedItems = <any>[];

  @Input() set category(category) {
    this._category = category;
  }

  get category() {
    return this._category;
  }

  constructor(
    private departmentService: DepartmentService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService
  ) { }

  show() {
    this._show = true;
    this.selectCategory = this.category;
    this.selectedId = 0;
  }


  showDisabled() {
    this.tabsService.create({
      name: '停用部门',
      link: '/basics/department/disabled',
      outlet: 'basics-department-disabled'
    });
  }

  close() {
    this._show = false;
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定停用部门列表失败!' + err
    });
  }

  onSearch(queryKey) {
    this.departmentService.onSearch(queryKey, (err) => {
      this.listErrorCallBack(err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.departmentService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.departmentService.list((err) => {
                this.listErrorCallBack(err);
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败！' + err
            });
          });
      }
    });
  }
}
