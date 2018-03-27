import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-product-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.less'],
    providers: [FormService]
  })

export class ProductUnitComponent {
  private products = <any>[];
  private selectedId: number;
  private _showUpdate = false;
  private subscription: Subscription;
  private form=new FormGroup({});
  private _show:boolean;
  private _productId:number;
  private _productUnitList:Array<any>;

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

  get productUnitList():Array<any>{ return this._productUnitList;}

  handleClose() {
    this.onClose.emit();
  }

  @Input()
  set productId(productId){
    this._productId = productId;
    if(this.show){
        this.productService.detail(productId).subscribe(data=>{             
            this._productUnitList=data.ProductUnitList;
            this.form = this.formService.createForm(data.ProductUnitList);
        });
    }    
  }
 
  get productId(){
      return this._productId;
  }

  getKeys(item) {
    return Object.keys(item);
  }
}
