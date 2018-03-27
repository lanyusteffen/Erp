import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ContentChild,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Component({
  selector: 'app-ui-dropdown',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})

export class DropdownComponent implements AfterViewInit {
  private _visible = false;
  @Input() placement = 'bottom';
  @ContentChild('toggle') _toggle;
  @ContentChild('menu') _menu;

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClicked(evt) {
    if (!this._elementRef.nativeElement.contains(evt.target)) {
      this._visible = false;
    }
  }

  ngAfterViewInit() {
    this._toggle.nativeElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._visible = !this._visible;
    });

    this._menu.nativeElement.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._visible = false;
    });
  }
}
