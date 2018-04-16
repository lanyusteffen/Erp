import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from './employee.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-basics-employee-disabled',
  template: `
  
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称'" (onSearch)="onSearch($event)"></app-quick-search>
    <app-ui-button [style]="'danger'" *ngIf="!systemConfig.IsOpenBill" [disabled]="!selectedItems.length" (click)="restore()">
        <i class="iconfont icon-delete"></i>
        还原
    </app-ui-button>
    <app-ui-button *ngIf="!systemConfig.IsOpenBill" [style]="'danger'" [disabled]="!selectedItems.length" (click)="delete()">
        <i class="iconfont icon-delete"></i>
        删除
    </app-ui-button>
    <div class="more">
    </div>
  </div>
  <div class="content">    
    <app-employee-disabled-list (selectItems)="selectItems($event)"></app-employee-disabled-list>
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
  `],
  providers: [
    AppService
  ]
})

export class EmployeeDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private employee;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private appService: AppService,
    private confirmService: ConfirmService
  ) {
  }

  ngOnInit() {

    this.systemConfig = this.getSystemConfig();
    this.subscription = this.employeeService
      .get()
      .subscribe();
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定停用职员列表失败!' + err
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

  onSearch(queryKey) {
    this.employeeService.onSearchDisabled(queryKey, (err) => {
      this.listErrorCallBack(err);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  restore() {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.employeeService
          .restore(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '还原成功！'
              });
              this.employeeService.listDisabled((err) => {
                this.listErrorCallBack(err);
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '还原失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '还原失败, ' + err
            });
          });
      }
    });
  }

  delete() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.employeeService
          .remove(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.employeeService.listDisabled((err) => {
                this.listErrorCallBack(err);
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }

}
