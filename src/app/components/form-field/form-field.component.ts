import { Component, OnInit, OnDestroy, Input, ContentChild, AfterContentInit, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { ErrorService } from '@services/error.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.less']
})
export class FormFieldComponent implements OnInit, OnDestroy {
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

  @ContentChild('formField') child;

  constructor(private errorService: ErrorService, private _render: Renderer2) {}

  ngOnInit() {

    this.subscription = this.errorService.get().subscribe(errors => this.updateErrorMessage(errors));

    this._render.listen(this.child.nativeElement, 'focus', () => {
        this.error = false;
        this.errorMessage = null;
    });
  }

  updateErrorMessage(errors: any) {
    const errorItem = errors.find(item => item.PropertyName === this.name);
    this.error = !!errorItem;

    if (this.error && typeof errorItem.ErrorMessage !== 'undefined') {
      this.errorMessage = errorItem.ErrorMessage;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
