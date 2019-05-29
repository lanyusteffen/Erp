import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MenuService } from '../../menu.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { AppService } from '@services/app.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-menu-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class MenuDisabledListComponent implements OnInit, OnDestroy {
  private menus = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private menuService: MenuService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.complete();
    this.subscription = this.menuService
      .getDisabled()
      .subscribe(({ menus, currentPagination }) => {
        this.menus = menus;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.menuService.listDisabled((err) => {
      this.loadingBar.complete();
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
     }, () => {
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
    this.loadingBar.start();
    this.menuService.onPageChangeDisabled({
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
        this.menuService
          .remove([id], data => {
            if (data.IsValid) {
              this.menuService.listDisabled((err) => {
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
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.menuService
          .restore([id], data => {
            if (data.IsValid) {
              this.menuService.listDisabled((err) => {
                this.loadingBar.complete();
                this.alertService.listErrorCallBack(ModuleName.Menu, err);
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
