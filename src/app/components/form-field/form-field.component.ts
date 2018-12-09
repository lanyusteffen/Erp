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

  updateErrorMessage(errors: any) {
    const errorItem = errors.find(item => item.PropertyName === this.name);
    this.error = !!errorItem;

    if (this.error) {
      this.errorMessage = errorItem.ErrorMessage;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
