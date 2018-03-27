import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService, Tab } from './components/tabs/tabs.service';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { ConfirmService } from './services/confirm.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [AppService]
})

export class AppComponent implements OnInit, OnDestroy {
  private tabs: Tab[];
  private subscription: Subscription;
  private alertSubscription: Subscription;
  private confirmSubScription: Subscription;
  private loadingSubscription: Subscription;
  private alert = null;
  private confirm = null;
  private loading: boolean;

  constructor(
    private router: Router,
    private tabsService: TabsService,
    private appService: AppService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private loadingService: LoadingService
  ) {
    this.loadingSubscription = this.loadingService
      .get()
      .subscribe((loading) => {
        this.loading = loading;
      });

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
    this.appService.getSystemConfig().subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.alertSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.confirmSubScription.unsubscribe();
  }

  handleCloseAlert() {
    this.alertService.close();
  }

  handleCloseConfirm() {
    this.confirmService.close();
  }
}
