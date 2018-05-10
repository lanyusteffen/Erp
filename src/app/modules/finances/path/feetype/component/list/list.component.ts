import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FeeTypeService } from '../../feetype.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-feetype-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class FeeTypeListComponent implements OnInit, OnDestroy {
  private feeTypes = <any>[];
  private pagination = {};
  private _showContact = false;
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private feeTypeService: FeeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.feeTypeService
      .get()
      .subscribe(({ feeTypes, currentPagination }) => {
        this.feeTypes = feeTypes;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.feeTypeService.list((err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定费用类型列表失败, ' + err
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.feeTypes = this.feeTypes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.feeTypes : []);

  }

  select(evt, selectedItem) {
    this.feeTypes = this.feeTypes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.feeTypes.every(item => item.selected);
    this.selectItems.emit(this.feeTypes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.feeTypeService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定费用类型列表失败, ' + err
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
        this.feeTypeService
          .cancel([id], data => {
            if (data.IsValid) {
              this.feeTypeService.list((err) => {
                this.alertService.open({
                  type: 'danger',
                  content: '绑定费用类型列表失败, ' + err
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
