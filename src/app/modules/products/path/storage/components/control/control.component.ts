import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../storage.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-storage-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class StorageControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _storageId: number;

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';
 
  @Input()
  set storageId(storageId) {
   this._storageId = storageId;
   this.showPop();
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.storageService
          .newOne()
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      } else {
        this.storageService
          .detail(this._storageId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  get storageId() {
    return this._storageId;
  }

  get title(){
    return this.type=='create'?'新增仓库':'修改仓库';
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private storageService: StorageService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  validate(data,option:string):void{
    if (data.IsValid) {
      this.onClose.emit();
      this.alertService.open({
        type: 'success',
        content: option+'成功！'
      });      
      this.storageService.list();
    }
  }

  onSubmit({ value }) {
    if(value.Id==0){
      this.storageService.create(value).subscribe(data => {
        this.validate(data,"添加");
      });
    }else{
      this.storageService.modify(value).subscribe(data => {
        this.validate(data,"修改");
      });
    }    
  }
}


