import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService, Tab } from './tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})

export class TabsComponent implements AfterViewInit, OnDestroy {
  tabs: Tab[];
  subscription: Subscription;

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
    const link = this.tabService.remove(tab);
  }

  clearAll() {
    this.tabService.clear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
