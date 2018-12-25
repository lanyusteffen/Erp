import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.less']
})
export class NavsComponent implements OnInit {

  private _navItems = [];

  @Input()
  set navItems(items) {
    this._navItems = items;
  }

  constructor() { }

  ngOnInit() {
  }
}
