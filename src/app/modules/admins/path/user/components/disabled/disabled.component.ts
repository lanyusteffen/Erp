import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../user.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-user-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class UserDisabledListComponent implements OnInit, OnDestroy {
  private users = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.complete();
    this.subscription = this.userService
      .getDisabled()
      .subscribe(({ users, currentPagination }) => {
        this.users = users;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.appService.getSystemConfig((data) => {
      if (data.IsValid) {
        this.userService.listDisabled((err) => {
          this.loadingBar.complete();
          this.alertService.listErrorCallBack(ModuleName.User, err);
         }, () => {
           this.loadingBar.complete();
         });
      } else {
        this.loadingBar.complete();
        this.alertService.listErrorCallBack(ModuleName.User, data.ErrorMessages);
      }
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.User, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.users = this.users.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.users : []);
  }

  select(evt, selectedItem) {
    this.users = this.users.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.users.every(item => item.selected);
    this.selectItems.emit(this.users.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.loadingBar.start();
    this.userService.onPageChangeDisabled({
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
        this.userService
          .remove([id], data => {
            if (data.IsValid) {
              this.userService.listDisabled((err) => {
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
        this.userService
          .restore([id], data => {
            if (data.IsValid) {
              this.userService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.User, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.restoreSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.restoreFail(data.ErrorMessages);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.restoreFail(err);
          });
      }
    });
  }
}
