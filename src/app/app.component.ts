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

    // this._router.events.subscribe((event: Event) => {
    //   this.navigationInterceptor(event);
    // });

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

   /**
   * This is used to intercept and show Loading bar based on the current state of our
   * Router navigation
   * @param {Event} event
   */
  private navigationInterceptor(event: Event): void {
    // if (event instanceof NavigationStart) {
    //   if (!this._loadingBar.visible) {
    //     this._loadingBar.start();
    //   }
    // }

    // if (event instanceof NavigationEnd) {
    //   if (this._loadingBar.visible) {
    //     this._loadingBar.complete();
    //   }
    // }

    // if (event instanceof NavigationCancel) {
    //   if (this._loadingBar.visible) {
    //     this._loadingBar.complete();
    //   }
    // }

    // if (event instanceof NavigationError) {
    //   if (this._loadingBar.visible) {
    //     this._loadingBar.complete();
    //   }
    // }
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
