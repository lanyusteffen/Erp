import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OperationService } from '../../operation.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class OperationListComponent implements OnInit, OnDestroy {
  private operations = <any>[];
  private pagination = {};
  private _showContact = false;
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private _showPassword = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private operationService: OperationService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.operationService
      .get()
      .subscribe(({ operations, currentPagination }) => {
        this.operations = operations;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.operationService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Operation, err);
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
    this.operations = this.operations.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.operations : []);

  }

  select(evt, selectedItem) {
    this.operations = this.operations.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.operations.every(item => item.selected);
    this.selectItems.emit(this.operations.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.operationService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Operation, err);
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
        this.operationService
          .cancel([id], data => {
            if (data.IsValid) {
              this.operationService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Operation, err);
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
