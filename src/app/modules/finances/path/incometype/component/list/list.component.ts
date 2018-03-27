import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IncomeTypeService } from '../../incometype.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-incometype-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class IncomeTypeListComponent implements OnInit, OnDestroy {
  private incomeTypes = <any>[];
  private pagination = {};
  private _showContact = false;
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private incomeTypeService: IncomeTypeService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.incomeTypeService
      .get()
      .subscribe(({ incomeTypes, currentPagination }) => {
        this.incomeTypes = incomeTypes;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.incomeTypeService.list();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.incomeTypes = this.incomeTypes.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.incomeTypes : []);

  }

  select(evt, selectedItem) {
    this.incomeTypes = this.incomeTypes.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.incomeTypes.every(item => item.selected);
    this.selectItems.emit(this.incomeTypes.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.incomeTypeService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
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
        this.incomeTypeService
          .cancel([id])
          .subscribe(data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '停用成功！'
              });
              this.incomeTypeService.list();
            } else {
              this.alertService.open({
                type: 'danger',
                content: '停用失败, ' + data.ErrorMessages
              });
            }
          });
      }
    });
  }
}
