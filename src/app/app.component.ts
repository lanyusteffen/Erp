import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [AppService]
})

export class AppComponent {
  constructor(private router: Router) { }
}
