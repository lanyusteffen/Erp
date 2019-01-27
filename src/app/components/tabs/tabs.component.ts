import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService } from './tabs.service';
import { Router } from '@angular/router';
import { Tab } from '@contracts/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})

export class TabsComponent implements AfterViewInit, OnDestroy {
  private tabs: Tab[];
  private subscription: Subscription;

  constructor(
      private tabService: TabsService,
      private router: Router) {
    this.tabs = this.tabService.all();
  }

  ngAfterViewInit() {
    this.subscription = this.tabService.get().subscribe((tabs) => {
      this.tabs = tabs;
    });
  }

  closeTab(event: Event, tab: Tab) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigateByUrl(this.tabService.remove(tab), { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
