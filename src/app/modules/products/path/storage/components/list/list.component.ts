import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from '../../storage.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';

import { AppService } from '@services/app.service';
import { LocalStorage } from 'ngx-webstorage';


@Component({
    selector: 'app-storage-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less'],
    providers:[
      AppService
    ]
  })

export class StorageListComponent implements OnInit, OnDestroy {
  private storages = <any>[];
  private pagination = {};
  private allSelected = false;
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig:any;

  @Output() selectItems: EventEmitter<any> = new EventEmitter();

  constructor(
    private storageService: StorageService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private appService:AppService
  ) {
    this.subscription = this.storageService
      .get()
      .subscribe(({ storages, currentPagination }) => {
        this.storages = storages;
        this.pagination = currentPagination;
      });
  }

  

  listErrorCallBack(err:any):void{
    this.alertService.open({
      type:'danger',
      content:'绑定仓库列表失败!'+err
    });
  }

  ngOnInit() {
    this.getSystemConfig();
    this.storageService.list((err)=>{
      this.listErrorCallBack(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig().subscribe((data) => {
        this.systemConfig = data;
      });
    }
    return this.systemConfig;
  }



  selectAll(evt) {
    this.allSelected = evt.target.checked;
    this.storages = this.storages.map(item => ({
      ...item,
      selected: this.allSelected
    }));
    this.selectItems.emit(this.allSelected ? this.storages : []);

  }

  select(evt, selectedItem) {
    this.storages = this.storages.map(item => ({
      ...item,
      selected: item.Id === selectedItem.Id ? evt.target.checked : item.selected
    }));
    this.allSelected = this.storages.every(item => item.selected);
    this.selectItems.emit(this.storages.filter(item => item.selected));
  }

  onPageChange({ current, pageSize }) {
    this.storageService.onPageChange({
      PageIndex: current,
      PageSize: pageSize
    },(err)=>{
      this.listErrorCallBack(err);
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
        this.storageService
          .cancel([id],data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '停用成功！'
              });
              this.storageService.list((err)=>{
                this.listErrorCallBack(err);
              });
            }
          },(err)=>{
            this.alertService.open({
              type: 'danger',
              content: '停用失败！'+err
            });
          });
      }
    });
  }

  onRemove(id) {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.storageService
          .remove([id],data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.storageService.list((err)=>{
                this.listErrorCallBack(err);
              });
            }
          },(err)=>{
            this.alertService.open({
              type: 'danger',
              content: '删除失败！'+err
            });
          });
      }
    });
  }
}
