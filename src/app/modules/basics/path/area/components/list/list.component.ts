import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AreaService } from '../../area.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';

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
    private alertService: AlertService
  ) {
    this.subscription = this.areaService
      .get()
      .subscribe(({ areas, currentPagination }) => {
        this.areas = areas;
        this.pagination = currentPagination;
      });
  }

  ngOnInit() {
    this.areaService.list();
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
          .cancel([id])
          .subscribe(data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '停用成功！'
              });
              this.areaService.list();
            }
          });
      }
    });
  }

  onRemove(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.areaService
          .remove([id])
          .subscribe(data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.areaService.list();
            }
          });
      }
    });
  }
}
