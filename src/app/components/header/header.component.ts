import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  logoff(): void {
    this.authService.logout();
    this.router.navigate(['/authorize/login']);
  }
}
