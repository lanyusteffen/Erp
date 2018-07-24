import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SystemUnitService } from '../../systemUnit.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-systemunit-disabled-list',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.less']
})

export class SystemUnitDisabledListComponent implements OnInit, OnDestroy {
  private systemUnits = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private systemConfig: boolean;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private systemUnitService: SystemUnitService,
    private confirmService: ConfirmService,
    private alertService: AlertService
  ) {
    this.subscription = this.systemUnitService
      .get()
      .subscribe(({ systemUnits, currentPagination }) => {
        this.systemUnits = systemUnits;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.systemUnitService.listDisabled((err) => {
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
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
      this.alertService.listErrorCallBack(ModuleName.Cancel, err);
    });
  }

  update(id) {
    this.selectedId = id;
    this._showUpdate = true;
  }

  closeUpdate() {
    this._showUpdate = false;
  }

  delete(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.systemUnitService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.systemUnitService.listDisabled((err) => {
                this.alertService.listErrorCallBack(ModuleName.Cancel, err);
              });
            } else {
              this.alertService.removeFail(data.ErrorMessages);
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }

  restore(id) {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.systemUnitService.restore([id], data => {
          if (data.IsValid) {
            this.alertService.restoreSuccess();
            this.systemUnitService.listDisabled((err) => {
              this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
            });
          } else {
            this.alertService.restoreFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.restoreFail(err);
        });
      }
    });
  }
}
