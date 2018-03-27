import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AreaService } from '../../area.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-area-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class AreaControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _areaId: number;

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';
 
  @Input()
  set areaId(areaId) {
   this._areaId = areaId;
   this.showPop();
  }

  get title(){
    return this.type=='create'?'新增地区':'修改地区';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.areaService
          .newOne()
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      } else {
        this.areaService
          .detail(this._areaId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  get areaId() {
    return this._areaId;
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private areaService: AreaService,
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
      this.areaService.list();
    }
  }

  onSubmit({ value }) {
    if(value.Id==0){
      this.areaService.create(value).subscribe(data => {
        this.validate(data,"添加");
      });
    }else{
      this.areaService.modify(value).subscribe(data => {
        this.validate(data,"修改");
      });
    }    
  }
}


