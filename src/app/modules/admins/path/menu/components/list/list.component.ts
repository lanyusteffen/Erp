import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MenuService } from '../../menu.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-menu-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class MenuListComponent implements OnInit, OnDestroy {
  private menus = <any>[];
  private pagination = {};
  private _showContact = false;
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private _showPassword = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private menuService: MenuService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.menuService
      .get()
      .subscribe(({ menus, currentPagination }) => {
        this.menus = menus;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.menuService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
      this.loadingBar.complete();
    },()=>{
      this.loadingBar.complete();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.menus = this.menus.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.menus : []);

  }

  select(evt, selectedItem) {
    this.menus = this.menus.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.menus.every(item => item.selected);
    this.selectItems.emit(this.menus.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.menuService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
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
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.menuService
          .cancel([id], data => {
            if (data.IsValid) {
              this.menuService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Menu, err);
              }, () => {
                this.alertService.cancelSuccess();
              });
            } else {
              this.alertService.cancelFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
