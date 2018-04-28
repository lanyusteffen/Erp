import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [AppService]
})

export class AppComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.checkAuthorize()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/authorize/login']);
    }
  }
}
