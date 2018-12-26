import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { Subscription } from 'rxjs/Subscription';
import { NavService } from './nav.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.less']
})
export class NavsComponent implements OnInit, OnDestroy {

  @Output() onSelectedChange: EventEmitter<NavItem> = new EventEmitter();
  private navs: NavItem[];
  private subscription: Subscription;

  constructor(private navService: NavService) {
    this.navs = this.navService.all();
  }

  ngOnInit() {
    this.subscription = this.navService.get().subscribe((navs) => {
      this.navs = navs;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleChange(nav: NavItem) {
    this.onSelectedChange.emit(nav);
  }
}
