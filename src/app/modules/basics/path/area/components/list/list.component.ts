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


  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定地区列表失败!' + err
    });
  }

  ngOnInit() {
    this.areaService.list((err) => {
      this.listErrorCallBack(err)
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
      this.listErrorCallBack(err)
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
              this.alertService.open({
                type: 'success',
                content: '停用成功！'
              });
              this.areaService.list((err) => {
                this.listErrorCallBack(err)
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '停用失败！' + err
            });
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
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.areaService.list((err) => {
                this.listErrorCallBack(err)
              });
            }
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '删除失败！' + err
            });
          });
      }
    });
  }
}
