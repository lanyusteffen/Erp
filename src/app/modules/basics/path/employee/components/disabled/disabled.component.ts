import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService } from '../../employee.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';


@Component({
    selector: 'app-employee-disabled-list',
    templateUrl: './disabled.component.html',
    styleUrls: ['./disabled.component.less']
  })

export class EmployeeDisabledListComponent implements OnInit, OnDestroy {
  private employees = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig:any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService:AppService
  ) {
    this.subscription = this.employeeService
      .get()
      .subscribe(({ employees, currentPagination }) => {
        this.employees = employees;
        this.pagination = currentPagination;
      });
  }
 

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      },(err)=>{
        this.alertService.open({
          type:'danger',
          content:'获取系统配置失败'+err
        });
      });
    }
    return this.systemConfig;
  }

  listErrorCallBack(err:any):void{
    this.alertService.open({
      type:'danger',
      content:'绑定停用职员列表失败!'+err
    });
  }

  ngOnInit() {
    this.getSystemConfig()
    this.employeeService.listDisabled((err)=>{
      this.listErrorCallBack(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.employees = this.employees.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.employees : []);

  }

  select(evt, selectedItem) {
    this.employees = this.employees.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.employees.every(item => item.selected);
    this.selectItems.emit(this.employees.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.employeeService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    },(err)=>{
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

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.employeeService
          .remove([id],data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.employeeService.listDisabled((err)=>{
                this.listErrorCallBack(err);
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          },(err)=>{
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.employeeService.restore([id],data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '还原成功！'
            });
            this.employeeService.listDisabled((err)=>{
              this.listErrorCallBack(err);
            });
          } else {
            this.alertService.open({
              type: 'danger',
              content: '还原失败, ' + data.ErrorMessages
            });
          }
        },(err)=>{
          this.alertService.open({
            type: 'danger',
            content: '还原失败, ' + err
          });
        });
      }
    });
  }
}
