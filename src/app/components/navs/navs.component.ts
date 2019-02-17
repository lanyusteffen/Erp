import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavItem } from '@contracts/nav.item';
import { Subscription } from 'rxjs/Subscription';
import { NavService } from './nav.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.less'],
  providers: [
    {
      provide: NavService,
      useClass: NavService
    }
  ]
})
export class NavsComponent implements OnInit, OnDestroy {

  @Output() onSelectedChange: EventEmitter<NavItem> = new EventEmitter();
  private navs: NavItem[];
  private lastNav: NavItem = null;
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
    if (this.lastNav == null) {
      if (this.navs.length > 0) {
        this.lastNav = this.navs[0];
      }
    }
    this.lastNav.IsSelected = false;
    nav.IsSelected = true;
    this.onSelectedChange.emit(nav);
    this.lastNav = nav;
  }
}
