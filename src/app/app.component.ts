import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-form';
  welcom:any;

  constructor(public authenticationService: AuthenticationService) {
    if (sessionStorage.getItem('connected_user')) {
      
      this.authenticationService.isAuthenticated=true;
    }
   }

   ngOnInit() {
     console.log("befor")
    this.welcom = JSON.parse(sessionStorage.getItem('connected_user'));
    console.log("after")
;
  }
   

  logout() {
    this.authenticationService.logout();
  
  }
}
