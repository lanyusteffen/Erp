import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-product-storageInit',
    templateUrl: './storageInit.component.html',
    styleUrls: ['./storageInit.component.less'],
    providers: [FormService]
  })

export class ProductStorageInitComponent {
  private products = <any>[];
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private form=new FormGroup({});
  private _show:boolean;
  private _productId:number;
  private _storageInitList:Array<any>;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private formService:FormService
  ) {
  }

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  get storageInitList():Array<any>{ return this._storageInitList;}

  handleClose() {
    this.onClose.emit();
  }

  listErrorCallBack(err:any):void{
    this.alertService.open({
      type:'danger',
      content:'绑定期初列表失败!'+err
    });
  }


  @Input()
  set productId(productId){
    this._productId = productId;
    if(this.show){        
        this.productService.getStorageDetailList(productId,data=>{
          this.createStorageInitList(data);
          this.form = this.formService.createForm(this._storageInitList);
      },(err)=>{
        this.listErrorCallBack(err)
      });            
    }    
  }

  createStorageInitList(data):void{

    let storageInitList=new Array();  

      data.forEach(item => {
        const storageInit = {
            StorageName:item.StorageName,
            ProductSpecColorAlias:item.ProductSpecColorAlias,
            ProductSpecSizeAlias:item.ProductSpecSizeAlias,
            ProductUnit:item.ProductUnit,
            UnitCost:item.UnitCost,
            InitialTotalAmount:item.InitialTotalAmount,
            BeginCount:item.BeginCount,
            IsOpenSku:item.IsOpenSku,
            StorageLowerAlarmCount:item.StorageLowerAlarmCount,
            StorageUpAlarmCount:item.StorageUpAlarmCount
        };
        storageInitList.push(storageInit);
      });

      this._storageInitList =  storageInitList;
  }

 
  get productId(){
      return this._productId;
  }

  getKeys(item) {
    return Object.keys(item);
  }
}
