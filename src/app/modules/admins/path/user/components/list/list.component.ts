import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../user.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [
    AppService
  ]
})

export class UserListComponent implements OnInit, OnDestroy {
  private users = <any>[];
  private pagination = {};
  private _showContact = false;
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private _showPassword = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.userService
      .get()
      .subscribe(({ users, currentPagination }) => {
        this.users = users;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.userService.list((err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.User, err);
    }, () => {
      this.loadingBar.complete();
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
    this.userService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.User, err);
    }, () => {
      this.loadingBar.complete();
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  changePassword(id) {
    this.selectedId = id;
    this._showPassword = true;
  }

  closeChangePassword() {
    this._showPassword = false;
  }

  onCancel(id) {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.userService
          .cancel([id], data => {
            if (data.IsValid) {
              this.userService.list((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.User, err);
              }, () => {
                this.loadingBar.complete();
                this.alertService.cancelSuccess();
              });
            } else {
              this.loadingBar.complete();
              this.alertService.cancelFail(data.ErrorMessages);
            }
          }, (err) => {
            this.loadingBar.complete();
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
