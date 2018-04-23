import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsService, Tab } from './components/tabs/tabs.service';
import { AppService } from './services/app.service';
import { AlertService } from './services/alert.service';
import { ConfirmService } from './services/confirm.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

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
  private routeSubscription: Subscription;
  private alert = null;
  private confirm = null;
  private loading: boolean;

  constructor(
    private router: Router,
    private tabsService: TabsService,
    private appService: AppService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private _router: Router,
    private _loadingBar: SlimLoadingBarService
  ) {

    this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this._loadingBar.start();
        } else if ( event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError) {
            this._loadingBar.complete();
        }
    }, (error: any) => {
        this._loadingBar.complete();
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
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.alertSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.confirmSubScription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  handleCloseAlert() {
    this.alertService.close();
  }

  handleCloseConfirm() {
    this.confirmService.close();
  }
}
