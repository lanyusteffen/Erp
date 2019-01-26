import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SystemUnitService } from '../../systemunit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-systemunit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class SystemUnitListComponent implements OnInit, OnDestroy {
  private systemUnits = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private systemUnitService: SystemUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.systemUnitService
      .get()
      .subscribe(({ systemUnits, currentPagination }) => {
        this.systemUnits = systemUnits;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.systemUnitService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
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
    this.systemUnits = this.systemUnits.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.systemUnits : []);
  }

  select(evt, selectedItem) {
    this.systemUnits = this.systemUnits.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.systemUnits.every(item => item.selected);
    this.selectItems.emit(this.systemUnits.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.systemUnitService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
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
        this.systemUnitService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.systemUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
              });
            }
          }, (err) => {
            this.alertService.cancelFail(err);
          });
      }
    });
  }

  onRemove(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.systemUnitService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.systemUnitService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
