import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AreaService } from '../../area.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-area-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class AreaListComponent implements OnInit, OnDestroy {
  private areas = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private areaService: AreaService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.loadingBar.start();
    this.subscription = this.areaService
      .get()
      .subscribe(({ areas, currentPagination }) => {
        this.areas = areas;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.areaService.list((err) => {
      this.alertService.listErrorCallBack(ModuleName.Area, err);
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
    this.areas = this.areas.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.areas : []);

  }

  select(evt, selectedItem) {
    this.areas = this.areas.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.areas.every(item => item.selected);
    this.selectItems.emit(this.areas.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.areaService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Area, err);
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
        this.areaService
          .cancel([id], data => {
            if (data.IsValid) {
              this.alertService.cancelSuccess();
              this.areaService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Area, err);
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
        this.areaService
          .remove([id], data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.areaService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Area, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
