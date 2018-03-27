import { Component, OnInit, OnDestroy, Input, ContentChild, AfterContentInit, Renderer2 } from '@angular/core';
import { ErrorService } from '@services/error.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.less']
})
export class FormFieldComponent implements OnInit, OnDestroy, AfterContentInit {
  private error = false;
  private errorMessage = '';
  private subscription: Subscription;

  @Input() name: string;

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
  }

  ngAfterContentInit() {
    this._render.listen(this.child.nativeElement, 'change', () => {
      this.errorService.remove(this.name);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
