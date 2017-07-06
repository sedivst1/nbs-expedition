import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.css'],
})
export class Login implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {}

  login(userID) {
    this._authService.login(userID).subscribe(
      data => {
        this._router.navigate(['/invoices']);
      },
      error => {
        (<HTMLInputElement>document.getElementById('userID')).value = '';
      }
    );
    return false;
  }

  /* returns true, if user logged, but failed, otherwise returns false */
  userLoginFailed() {
    return (this._authService.userLoginFailed());
  }

  ngOnInit() {
    if (this._authService.userLogged()) {
      this._authService.logout();
    }

    document.getElementById('userID').focus();
  }

}
