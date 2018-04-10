import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SupplierService } from '../../supplier.service';
import { LocalStorage } from 'ngx-webstorage';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-supplier-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less'],
  providers: [
    AppService
  ]
})

export class SupplierDisabledListComponent implements OnInit, OnDestroy {
  private suppliers = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private supplierService: SupplierService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.subscription = this.supplierService
      .get()
      .subscribe(({ suppliers, currentPagination }) => {
        this.suppliers = suppliers;
        this.pagination = currentPagination;
      });
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig().subscribe((data) => {
        this.systemConfig = data;
      });
    }
    return this.systemConfig;
  }

  ngOnInit() {
    this.getSystemConfig();
    this.supplierService.listDisabled((err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定供应商列表失败, ' + err
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.suppliers = this.suppliers.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.suppliers : []);

  }

  select(evt, selectedItem) {
    this.suppliers = this.suppliers.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.suppliers.every(item => item.selected);
    this.selectItems.emit(this.suppliers.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.supplierService.onPageChangeDisabled({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {

    });
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.supplierService
          .remove([id], data => {
            if (data.IsValid) {
           
              this.supplierService.listDisabled((err) => {

              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '删除成功！'
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          }, () => {

          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.supplierService
          .restore([id], data => {
            if (data.IsValid) {
              this.supplierService.listDisabled((err) => {
                this.alertService.open({
                  type: 'success',
                  content: '绑定供应商列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '还原成功！'
                });
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
}
