import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../role.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-role-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class RoleDisabledListComponent implements OnInit, OnDestroy {
  private roles = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.roleService
      .getDisabled()
      .subscribe(({ roles, currentPagination }) => {
        this.roles = roles;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    this.appService.getSystemConfig((data) => {
      this.systemConfig = data;
      this.roleService.listDisabled((err) => {
        this.alertService.listErrorCallBack(ModuleName.Role, err);
      });
    }, (err) => {
      this.alertService.systemConfigFail(err);
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
    this.roles = this.roles.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.roles : []);

  }

  select(evt, selectedItem) {
    this.roles = this.roles.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.roles.every(item => item.selected);
    this.selectItems.emit(this.roles.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.roleService.onPageChangeDisabled({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    });
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.roleService
          .remove([id], data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Role, err);
              }, () => {
                this.alertService.removeSuccess();
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
        this.roleService
          .restore([id], data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Role, err);
              }, () => {
                this.alertService.restoreSuccess();
              });
            } else {
              this.alertService.restoreFail(data.ErrorMessages)
            }
          }, (err) => {
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
