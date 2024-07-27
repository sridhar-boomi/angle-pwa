import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showBackButton = false;
  backButtonRoute = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.showBackButton = !(this.router.url === '/' || this.router.url === '/home');
        if (this.showBackButton) {
          const currentUrl = this.router.url.split('/')[1];
          if (currentUrl === 'choose-light') {
            this.backButtonRoute = '/home';
          }
          else if (currentUrl === 'choose-light-type') {
            this.backButtonRoute = '/choose-light';
          }
          else if (currentUrl === 'preparation') {
            this.backButtonRoute = '/choose-light-type';
          }
          else if (currentUrl === 'alignment') {
            this.backButtonRoute = '/preparation';
          }
        }
      });
  }


}
