import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { AlertService } from '@services/alert.service';
import { LocalStorage } from 'ngx-webstorage';
import { AppService } from '@services/app.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-basics-product-disabled',
  template: `
  
  <div class="actions">
    <app-quick-search [placeholder]="'输入商品编号、名称、规格型号、品牌'" (onSearch)="onSearch($event)"></app-quick-search>
    <app-ui-button [style]="'danger'" *ngIf="!systemConfig.IsOpenBill" [disabled]="!selectedItems.length" (click)="restore()">
        <i class="iconfont icon-delete"></i>
        还原
    </app-ui-button>
    <app-ui-button *ngIf="!systemConfig.IsOpenBill" [style]="'danger'" [disabled]="!selectedItems.length" (click)="delete()">
        <i class="iconfont icon-delete"></i>
        删除
    </app-ui-button>
    <div class="more">
    </div>
  </div>
  <div class="content">
    <app-category  [categoryType]="'Product'" [resourceType]="''" (onChange)="onCategoryChange($event)"
  ></app-category>    
    <app-product-disabled-list (selectItems)="selectItems($event)"></app-product-disabled-list>
  </div>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      display: flex;
    }
  `],
  providers: [
    AppService
  ]
})

export class ProductDisabledComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private department;
  private subscription: Subscription;

  @LocalStorage()
  systemConfig: any;

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private appService:AppService,
    private confirmService : ConfirmService
  ) {
  }  

  listErrorCallBack(err:any):void{
    this.alertService.open({
      type:'danger',
      content:'绑定停用商品列表失败!'+err
    });
  }

  ngOnInit() {
    
    this.systemConfig = this.getSystemConfig();
    this.subscription = this.productService
      .get()
      .subscribe();
  }

  getSystemConfig(): any {
    if (!this.systemConfig) {
      this.appService.getSystemConfig((data) => {
        this.systemConfig = data;
      },(err)=>{
        this.alertService.open({
          type:'danger',
          content:'获取系统配置失败'+err
        });
      });
    }
    return this.systemConfig;
  }

  onSearch(queryKey) {
    this.productService.onSearchDisabled(queryKey,(err)=>{
      this.listErrorCallBack(err)
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }

  restore() {
    this.confirmService.open({
      content: '确认还原吗？',
      onConfirm: () => {
        this.productService
          .restore(this.selectedItems.map(item => item.Id),data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '还原成功！'
              });
              this.productService.listDisabled((err)=>{
                this.listErrorCallBack(err)
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '还原失败, ' + data.ErrorMessages
              });
            }
          },(err)=>{
            this.alertService.open({
              type: 'danger',
              content: '还原失败, ' + err
            });
          });
      }
    });
  } 

  delete(){
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.productService
          .remove(this.selectedItems.map(item => item.Id),data => {
            if (data.IsValid) {
              this.alertService.open({
                type: 'success',
                content: '删除成功！'
              });
              this.productService.listDisabled((err)=>{
                this.listErrorCallBack(err)
              });
            } else {
              this.alertService.open({
                type: 'danger',
                content: '删除失败, ' + data.ErrorMessages
              });
            }
          },(err)=>{
            this.alertService.open({
              type: 'danger',
              content: '删除失败, ' + err
            });
          });
      }
    });
  }

}
