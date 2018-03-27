import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';

@Directive({
  selector: '[appTabOutlet]',
})

export class TabOutletDirective implements OnInit, OnDestroy {
  private outlet: RouterOutlet;

  @Input() private name: string;

  constructor(
    private parentContexts: ChildrenOutletContexts,
    private location: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.outlet = new RouterOutlet(this.parentContexts, this.location, this.resolver, this.name, this.changeDetector);
  }

  ngOnDestroy() {
    this.outlet.ngOnDestroy();
  }
}
