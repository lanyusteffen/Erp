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
  private errorMessage = '';
  private subscription: Subscription;

  @Input() name: string;

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

    this.subscription = this.errorService.get().subscribe(errors => {

      const errorItem = errors.find(item => item.PropertyName === this.name);
      this.error = !!errorItem;

      if (this.error) {
        this.errorMessage = errorItem.ErrorMessage;
      }
    });

    this._render.listen(this.child.nativeElement, 'focus', () => {
        this.error = false;
        this.errorMessage = null;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
