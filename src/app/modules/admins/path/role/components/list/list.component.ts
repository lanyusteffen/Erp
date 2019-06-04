import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../role.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [
    AppService
  ]
})

export class RoleListComponent implements OnInit, OnDestroy {
  private roles = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.roleService
      .get()
      .subscribe(({ roles, currentPagination }) => {
        this.roles = roles;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.roleService.list((err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    }, () => {
      this.loadingBar.complete();
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
    this.roleService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Role, err);
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

  onCancel(id) {
    this.loadingBar.start();
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.roleService
          .cancel([id], data => {
            if (data.IsValid) {
              this.roleService.list((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Role, err);
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
