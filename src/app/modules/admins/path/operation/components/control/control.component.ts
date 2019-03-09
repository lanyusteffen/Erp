import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { OperationService } from '../../operation.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-operation-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class OperationControlComponent {
  private controlForm = new FormGroup({});
  private _show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }
  @Input() type = 'create';

  private _operationId: number;

  get operationId() {
    return this._operationId;
  }

  @Input()
  set operationId(operationId) {
    this._operationId = operationId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加菜单';
    } else {
      return '修改菜单';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.operationService
          .newOne(data => {
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Operation, err);
          });
      } else {
        this.operationService
          .detail(this.operationId, data => {
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Operation, err);
          });
      }
    }
  }

  constructor(
    private operationService: OperationService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.controlForm.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  getParent(item :any){
    console.log(item);
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.operationService.create(value, data => {
        if (data.IsValid) {
          this.operationService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Operation, err);
          }, () => {
            this.onClose.emit();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.operationService.update(value, data => {
        if (data.IsValid) {
          this.operationService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Operation, err);
          }, () => {
            this.onClose.emit();
            this.alertService.modifySuccess();
          });
        } else {
          this.alertService.modifyFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}


