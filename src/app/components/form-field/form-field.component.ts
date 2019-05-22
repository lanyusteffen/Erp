import { Component, OnInit, OnDestroy, Input, ContentChild, Renderer2, AfterContentInit, QueryList, ElementRef } from '@angular/core';
import { ErrorService } from '@services/error.service';
import { Subscription } from 'rxjs/Subscription';
import { PopupNoInputControlInterface } from '@contracts/popup-noinput-control.interface';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.less']
})
export class FormFieldComponent implements OnInit, OnDestroy, AfterContentInit  {
  private error = false;
  private subscription: Subscription;

  @Input() name: string;
  @Input() columnName: string = null;
  @Input() row: number;
  @Input() errorMessage: string;
  @Input() complexType = false;

  @Input()
  set validError(value) {
    if (value !== null && value !== undefined && value !== '') {
      this.error = true;
      this.errorMessage = value;
    }
  }

  @ContentChild('formField') handler: any;

  constructor(private errorService: ErrorService, private _render: Renderer2) {}

  ngOnInit() {
    this.subscription = this.errorService.get().subscribe(errors => this.updateErrorMessage(errors));
  }

  ngAfterContentInit() {
    if (this.complexType) {
      const validateControl = this.handler as PopupNoInputControlInterface;
      if (validateControl) {
        this._render.listen(validateControl.controlHandler.nativeElement, 'click', () => {
          this.error = false;
          this.errorMessage = null;
        });
      }
    } else {
      this._render.listen(this.handler.nativeElement, 'focus', () => {
        this.error = false;
        this.errorMessage = null;
      });
    }
  }

  findError(errors: any) {
    Object.keys(errors).forEach(row => {
      const errorItem = errors[row];
      const rowNum = parseInt(row, 10);
      if (rowNum < 0) {
        this.errorMessage = errorItem.ErrorMessage;
        this.error = true;
      } else {
        if (this.columnName === errorItem.PropertyName && rowNum === this.row) {
          this.errorMessage = errorItem.ErrorMessage;
          this.error = true;
        }
      }
    });
  }

  updateErrorMessage(errorFieldMap: any) {
    Object.keys(errorFieldMap).forEach(field => {
      if (field === this.name) {
        this.findError(errorFieldMap[field]);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
