import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'user-interface',
  templateUrl: 'user-interface.template.html',
  styleUrls: [ 'user-interface.style.css' ],
  providers: [
    { provide: LOCALE_ID, useValue: 'cs-CZ' }
  ]
})

export class UserInterface implements OnInit {

  private dateNow;
  private usersFullName: string = null;

  constructor(private _authService: AuthService, private _router: Router) {}

  onClickLogout() {
    this._authService.logout();
    this._router.navigate(['login']);
  }

  getUser() {
    let userID =  this._authService.userID();

    this._authService.getUsersData(userID)
      .subscribe(
      data => {
        this.usersFullName = data.firstName + ' ' + data.lastName;
      },
      error => {
        this.usersFullName = error;
      }
    );
  }

  ngOnInit() {
    /* if user not logged, need to redirect him back to login page */
    if (!this._authService.userLogged()) {
      this._router.navigate(['login']);
    }

    /* set actual time */
    this.dateNow = new Date();
    setInterval(() => {
      this.dateNow =  new Date();
    }, 60000); // every 60 second refreshes time

    /* set users full name to variable */
    this.getUser();
  }
}
