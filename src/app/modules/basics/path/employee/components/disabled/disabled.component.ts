import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService } from '../../employee.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


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
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.employeeService
      .getDisabled()
      .subscribe(({ employees, currentPagination }) => {
        this.employees = employees;
        this.pagination = currentPagination;
      });
  }


  getSystemConfig(): any {
    this.appService.getSystemConfig((data) => {
      this.systemConfig = data;
      this.employeeService.listDisabled((err) => {
        this.alertService.listErrorCallBack(ModuleName.Cancel, err);
        this.loadingBar.complete();
      },()=>{
        this.loadingBar.complete();
      });
    }, (err) => {
      this.alertService.systemConfigFail(err);
      this.loadingBar.complete();
    });
    return this.systemConfig;
  }

  ngOnInit() {
    this.getSystemConfig();
    
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
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.employeeService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              });
            } else {
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.employeeService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.employeeService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.Cancel, err);
            });
          } else {
            this.alertService.restoreFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.restoreFail(err);
        });
      }
    });
  }
}
