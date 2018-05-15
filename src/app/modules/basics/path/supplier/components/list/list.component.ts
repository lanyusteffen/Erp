import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SupplierService } from '../../supplier.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class SupplierListComponent implements OnInit, OnDestroy {
  private suppliers = <any>[];
  private pagination = {};
  private _showContact = false;
  private contactList = <any>[];
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private supplierService: SupplierService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.supplierService
      .get()
      .subscribe(({ suppliers, currentPagination }) => {
        this.suppliers = suppliers;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.supplierService.list((err) => {

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showContact(customerId) {
    this._showContact = true;
    this.supplierService.contactList(customerId, data => {
      this.contactList = data;
    }, (err) => {

    });
  }

  closeContact() {
    this._showContact = false;
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
    this.supplierService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {

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
    this.confirmService.open({
      content: '确认停用吗？',
      onConfirm: () => {
        this.supplierService
          .cancel([id], data => {
            if (data.IsValid) {
              this.supplierService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Supplier, err);
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
