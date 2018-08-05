import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TabsService } from './components/tabs/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [AppService]
})

export class AppComponent implements OnInit {

  menuList: Array<{ module: string }> = [];

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.checkAuthorize()) {
      this.router.navigate(['/home/index']);
    } else {
      this.router.navigate(['/authorize/login']);
    }
  }
}
