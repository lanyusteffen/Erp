import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService, Tab } from './tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})

export class TabsComponent implements AfterViewInit, OnDestroy {
  tabs: Tab[];
  subscription: Subscription;

  constructor(private tabsService: TabsService) {
    this.tabs = this.tabsService.all();
  }

  ngAfterViewInit() {
    this.subscription = this.tabsService.get().subscribe((tabs) => {
      this.tabs = tabs;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
