import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService } from '../../components/tabs/tabs.service';
import { AlertService } from '../../services/alert.service';
import { ConfirmService } from '../../services/confirm.service';
import { Tab } from '@contracts/tab';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit, OnDestroy {
  private tabs: Tab[];
  private subscription: Subscription;
  private alertSubscription: Subscription;
  private confirmSubScription: Subscription;
  private alert = null;
  private confirm = null;
  private loading: boolean;

  constructor(
    private tabsService: TabsService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {

    this.subscription = this.tabsService
      .get()
      .subscribe((tabs) => {
        this.tabs = tabs;
      });

    this.alertSubscription = this.alertService
      .get()
      .subscribe((alert) => {
        this.alert = alert;
      });

    this.confirmSubScription = this.confirmService
      .get()
      .subscribe((confirm) => {
        this.confirm = confirm;
      });
  }

  ngOnInit() {
    this.tabs = this.tabsService.all();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.alertSubscription.unsubscribe();
    this.confirmSubScription.unsubscribe();
  }

  handleCloseAlert() {
    this.alertService.close();
  }

  handleCloseConfirm() {
    this.confirmService.close();
  }
}
