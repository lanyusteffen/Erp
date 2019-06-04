import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../role.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
  private systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.complete();
    this.subscription = this.roleService
      .getDisabled()
      .subscribe(({ roles, currentPagination }) => {
        this.roles = roles;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.appService.getSystemConfig((data) => {
      if (data.IsValid) {
        this.roleService.listDisabled((err) => {
          this.loadingBar.complete();
          this.alertService.listErrorCallBack(ModuleName.Role, err);
         }, () => {
           this.loadingBar.complete();
         });
      } else {
        this.loadingBar.complete();
        this.alertService.listErrorCallBack(ModuleName.Role, data.ErrorMessages);
      }
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    });
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
    this.loadingBar.start();
    this.roleService.onPageChangeDisabled({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    }, () => {
      this.loadingBar.complete();
    });
  }

  delete(id) {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.roleService
          .remove([id], data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.removeSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.removeFail(err);
          });
      }
    });
  }

  restore(id) {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.roleService
          .restore([id], data => {
            if (data.IsValid) {
              this.roleService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Role, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.restoreSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.restoreFail(data.ErrorMessage);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
