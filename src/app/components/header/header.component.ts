import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent {

  @LocalStorage()
  private cacheUserName: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  logoff(): void {
    this.authService.logout();
    SimpleReuseStrategy.clear();
    this.router.navigate(['/authorize/login']);
  }
}
