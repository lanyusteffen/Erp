import { Component, OnInit, OnDestroy, Input, ContentChildren, Renderer2, AfterContentInit, QueryList, ElementRef } from '@angular/core';
import { ErrorService } from '@services/error.service';
import { Subscription } from 'rxjs/Subscription';

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

  @Input()
  set validError(value) {
    if (value !== null && value !== undefined && value !== '') {
      this.error = true;
      this.errorMessage = value;
    }
  }

  @ContentChildren('formField', {descendants: true, read: ElementRef}) handlers: QueryList<any>;

  constructor(private errorService: ErrorService, private _render: Renderer2) {}

  ngOnInit() {

    this.subscription = this.errorService.get().subscribe(errors => this.updateErrorMessage(errors));
  }

  ngAfterContentInit() {
    if (typeof this.handlers !== 'undefined') {
      this.handlers.forEach(ctrl => {
        if (ctrl.nativeElement.getAttribute('handler') == null) {
          this._render.listen(ctrl.nativeElement, 'focus', () => {
            this.error = false;
            this.errorMessage = null;
          });
        } else {
          this._render.listen(ctrl.nativeElement, 'click', () => {
            this.error = false;
            this.errorMessage = null;
          });
        }
      });
    } else {
      console.log(this.handlers);
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
