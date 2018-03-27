import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-employee-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class EmployeeControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _employeeId: number;

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';
 
  @Input()
  set employeeId(employeeId) {
   this._employeeId = employeeId;
   this.showPop();
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.employeeService
          .newOne()
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      } else {
        this.employeeService
          .detail(this._employeeId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  get employeeId() {
    return this._employeeId;
  }

  get title(){
    return this.type=='create'?'新增职员':'修改职员';
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
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
      this.employeeService.list();
    }
  }

  onSubmit({ value }) {
    if(value.Id==0){
      this.employeeService.create(value).subscribe(data => {
        this.validate(data,"添加");
      });
    }else{
      this.employeeService.modify(value).subscribe(data => {
        this.validate(data,"修改");
      });
    }    
  }
}


