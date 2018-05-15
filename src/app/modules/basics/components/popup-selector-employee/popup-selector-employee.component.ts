import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PaginationBarComponent } from '../../../../components/pagination-bar/pagination-bar.component';
import { AlertService } from '../../../../services/alert.service';
import { EmployeePopupSelectService } from './employee-popup-selector.service';

@Component({
  selector: 'app-popup-selector-employee',
  templateUrl: './popup-selector-employee.component.html',
  styleUrls: ['./popup-selector-employee.component.less'],
  providers: [EmployeePopupSelectService]
})
export class PopupSelectorEmployeeComponent {

  _showLabel = '';

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  @Output() onConfirm = new EventEmitter<any>();

  private employees = <any>[];
  private pagination = {};

  _isMultiSelect: boolean;
  _show: boolean;

  @Output() onSelectChanged = new EventEmitter<string>();

  @Input()
  set isMultiSelect(value) {
    this._isMultiSelect = value;
  }

  private _options = [
    { label: '10 条／页', value: 10 }
  ];
  private _size = 10;

  _selectedItem: any;

  select(item: any) {
    this.onSelectChanged.emit(item.Name);
    this._selectedItem = item;
  }

  @Output()
  get selectedValue() {
    return this._selectedItem.Id;
  }

  @Output()
  get selectedItem() {
    return this._selectedItem;
  }

  get show() {
    return this._show;
  }

  onPageChange({ current, pageSize }) {
    this.dataService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, ({ employees, currentPagination }) => {
      this.employees = employees;
      this.pagination = currentPagination;
    }, (err) => {
      this.alertService.open({
        type: 'danger',
        content: '绑定职员列表失败!' + err
      });
    });
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
    if (isShow) {
      this.dataService.list(({ employees, currentPagination }) => {
        this.employees = employees;
        this.pagination = currentPagination;
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '绑定职员列表失败!' + err
        });
      });
    }
  }

  constructor(private dataService: EmployeePopupSelectService,
              private alertService: AlertService) {
  }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  confirm() {
    this.onConfirm.emit(this.selectedItem);
    this.closeModal();
  }
}
