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

  constructor(private tabService: TabsService) {
    this.tabs = this.tabService.all();
  }

  ngAfterViewInit() {
    this.subscription = this.tabService.get().subscribe((tabs) => {
      this.tabs = tabs;
    });
  }

  closeTab(tab) {
    this.tabService.remove(tab);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
