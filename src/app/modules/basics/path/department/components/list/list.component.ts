import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DepartmentService } from '../../department.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';


@Component({
  selector: 'app-department-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [
    AppService
  ]
})

export class DepartmentListComponent implements OnInit, OnDestroy {
  private departments = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private selectCategory: any;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  @LocalStorage()
  systemConfig: any;

  constructor(
    private departmentService: DepartmentService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.departmentService
      .get()
      .subscribe(({ departments, currentPagination }) => {
        this.departments = departments;
        this.pagination = currentPagination;
      });
  }


  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '获取系统配置失败' + err
        });
      });
    }
    return this.systemConfig;
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定部门列表失败!' + err
    });
  }

  ngOnInit() {
    this.departmentService.list((err) => {
      this.listErrorCallBack(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.departments = this.departments.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.departments : []);

  }

  select(evt, selectedItem) {
    this.departments = this.departments.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.departments.every(item => item.selected);
    this.selectItems.emit(this.departments.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.departmentService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.listErrorCallBack(err);
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  onCancel(id) {
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.departmentService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '停用成功！'
              });
              this.departmentService.list((err) => {
                this.listErrorCallBack(err);
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '停用失败！' + err
            });
          });
      }
    });
  }

  onRemove(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.departmentService
          .remove([id], data => {
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
