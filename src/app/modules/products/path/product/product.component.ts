import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-basics-product',
  template: `
  <app-product-actions [selectedItems]="selectedItems" ></app-product-actions>
  <div class="content"> 
    <app-category  [categoryType]="'Product'" [resourceType]="''" (onChange)="onCategoryChange($event)"
  ></app-category>
    <app-product-list (selectItems)="selectItems($event)"></app-product-list>
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
  `]
})

export class ProductComponent implements OnInit, OnDestroy {
  private selectedItems = <any>[];
  private subscription: Subscription;
  private selectCategory :any;

  constructor(
    private productService: ProductService,
    private alertService:AlertService
  ) {
  }  

  listErrorCallBack(err:any):void{
    this.alertService.open({
      type:'danger',
      content:'绑定商品列表失败!'+err
    });
  }

  ngOnInit() {
    this.subscription = this.productService
      .get()
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItems(selected) {
    this.selectedItems = selected;
  }
 

  onCategoryChange(selected) {    

    this.selectCategory = selected;
    this.productService.onCategoryChange(selected,(err)=>{
      this.listErrorCallBack(err);
    });
  }
}
