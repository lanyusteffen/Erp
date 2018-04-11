import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OtherExchangeUnitService } from '../../other-exchange-unit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-otherexchangeunit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class OtherExchangeUnitListComponent implements OnInit, OnDestroy {
  private otherExchangeUnits = <any>[];
  private pagination = {};
  private _showContact = false;
  private contactList = <any>[];
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.otherExchangeUnitService
      .get()
      .subscribe(({ otherExchangeUnits, currentPagination }) => {
        this.otherExchangeUnits = otherExchangeUnits;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.otherExchangeUnitService.list((err) => {
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showContact(otherExchangeUnitId) {
    this._showContact = true;
    this.otherExchangeUnitService.contactList(otherExchangeUnitId, data => {
      this.contactList = data;
    },(err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定往来单位列表失败, ' + err
      });
    });
  }

  closeContact() {
    this._showContact = false;
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.otherExchangeUnits = this.otherExchangeUnits.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.otherExchangeUnits : []);

  }

  select(evt, selectedItem) {
    this.otherExchangeUnits = this.otherExchangeUnits.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.otherExchangeUnits.every(item => item.selected);
    this.selectItems.emit(this.otherExchangeUnits.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.otherExchangeUnitService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定往来单位列表失败, ' + err
      });
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
        this.otherExchangeUnitService
          .cancel([id], data => {
            if (data.IsValid) {
              this.otherExchangeUnitService.list((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定往来单位列表失败, ' + err
                });
              }, () => {
                this.alertService.open({
                  type: 'success',
                  content: '停用成功！'
                });
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '停用失败, ' + data.ErrorMessages
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '停用失败, ' + err
            });
          });
      }
    });
  }
}
