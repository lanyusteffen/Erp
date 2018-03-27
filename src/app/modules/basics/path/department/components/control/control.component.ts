import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-department-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class DepartmentControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _departmentId: number;
  private _category:any;

  @Input() 
  set category(category){
    this._category = category;
  };

  get category(){
    return this._category;
  }

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';
 
  @Input()
  set departmentId(departmentId) {
   this._departmentId = departmentId;
   this.showPop();
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.departmentService
          .newOne()
          .subscribe(data => {
            data.CategoryId = this._category.Id;
            this.form = this.formService.createForm(data);
          });
      } else {
        this.departmentService
          .detail(this._departmentId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  get departmentId() {
    return this._departmentId;
  }

  get title(){
    return this.type=='create'?'新增部门':'修改部门';
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private departmentService: DepartmentService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }
  get categoryName():String { return this.category? this.category.Name : this.form.get("CategoryName").value;}

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
      this.departmentService.list();
    }
  }

  onSubmit({ value }) {
    if(value.Id==0){
      this.departmentService.create(value).subscribe(data => {
        this.validate(data,"添加");
      });
    }else{
      this.departmentService.modify(value).subscribe(data => {
        this.validate(data,"修改");
      });
    }    
  }
}


