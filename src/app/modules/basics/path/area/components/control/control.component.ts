import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AreaService } from '../../area.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { ValidateBase } from '../../../../../../validators/ValidateBase';
import { ErrorService } from '@services/error.service';


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
  @Output() onClose: EventEmitter<any> = new EventEmitter();

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

  get title() {
    return this.type === 'create' ? '新增地区' : '修改地区';
  }

  private getValidators(){
    var validatorArrs ={
      Name:[
        Validators.maxLength(100),
        Validators.required,
        ValidateBase.urlValidator
      ]
    };

    
     return validatorArrs;
  }

  public setErrorMessage(propertyName,errors):void{
    var errorItems = new Array();
    if(errors){
      if(errors.isUrl){
        var errorItem = {
          AttemptedValue: "",
          ErrorCode:"NotEmptyValidator",
          ErrorDescription:null,
          ErrorMessage:"格式不正确",
          ErrorStackTrace:null,
          PropertyName:propertyName
        }
        errorItems.push(errorItem);
      }
    
    }
    this.errorService.setErrorItems(errorItems);
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.areaService
          .newOne(data => {
            this.form = this.formService.createForm(data,this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Area, err);
          });
      } else {
        this.areaService
          .detail(this._areaId, data => {
            this.form = this.formService.createForm(data,this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Area, err);
          });
      }
    }
  }

  get areaId() {
    return this._areaId;
  }

  constructor(
    private areaService: AreaService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private errorService: ErrorService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  validate(data, option: string): void {
    if (data.IsValid) {
      this.onClose.emit();
      this.alertService.open({
        type: 'success',
        content: option + '成功！'
      });
      this.areaService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.Area, err);
      });
    }
  }

  onSubmit({ value },IsValid) {  
    if(IsValid){
      if (value.Id === 0) {
        this.areaService.create(value, data => {
          this.validate(data, '添加');
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.areaService.modify(value, data => {
          this.validate(data, '修改');
        }, (err) => {
          this.alertService.modifyFail(err);
        });
      }
    }    
  }
}


