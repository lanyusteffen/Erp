import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomerService } from '../../customer.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class CustomerListComponent implements OnInit, OnDestroy {
  private customers = <any>[];
  private pagination = {};
  private _showContact = false;
  private contactList = <any>[];
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.customerService
      .get()
      .subscribe(({ customers, currentPagination }) => {
        this.customers = customers;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.customerService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Customer, err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showContact(customerId) {
    this._showContact = true;
    this.customerService.contactList(customerId, data => {
      this.contactList = data;
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.CustomerContact, err);
    });
  }

  closeContact() {
    this._showContact = false;
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.customers = this.customers.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.customers : []);
  }

  select(evt, selectedItem) {
    this.customers = this.customers.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.customers.every(item => item.selected);
    this.selectItems.emit(this.customers.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.customerService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, err => {
      this.alertService.listErrorCallBack(ModuleName.Customer, err);
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
        this.customerService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.customerService.list(err => {
                this.alertService.listErrorCallBack(ModuleName.Customer, err);
              });
            } else {
              this.alertService.cancelFail(data.ErrorMessages);
            }
          }, err => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }
}
