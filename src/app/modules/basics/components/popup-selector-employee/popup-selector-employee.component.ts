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

  @ViewChild(PaginationBarComponent)
  private paginationBar: PaginationBarComponent;

  @Output() onConfirm = new EventEmitter<any>();

  private employees = <any>[];
  private pagination = {};

  _showLabel = '';
  _isMultiSelect: boolean;
  _show: boolean;
  _size = 10;
  _selectedItem: any;
  _options = [
    { label: '10 条／页', value: 10 }
  ];

  @Output() onSelectChanged = new EventEmitter<string>();

  @Input()
  set isMultiSelect(value) {
    this._isMultiSelect = value;
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

  @Output()
  get selectedItem() {
    return this._selectedItem;
  }

  select(item: any) {
    this.onSelectChanged.emit(item.Name);
    this._selectedItem = item;
    this._showLabel = item.Name;
  }

  unSelect() {
    this._selectedItem = null;
    this._showLabel = '';
    this.onSelectChanged.emit(null);
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

  constructor(private dataService: EmployeePopupSelectService,
              private alertService: AlertService) {
  }
}
