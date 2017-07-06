import { Injectable } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private _invoice: InvoiceService, private _http: Http) {}

  getUsersData(id): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/user_ex_id/' + id)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              observer.next(data.result);
            } else {
              observer.error(data.result);
            }
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  login(userID): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/user_ex_id/' + userID)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              sessionStorage.setItem('userLogged', '1');
              sessionStorage.setItem('userID', userID);
              observer.next(data.result);
            } else {
              sessionStorage.setItem('userLogged', '-1');
              observer.error(data.result);
            }
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  logout() {
    sessionStorage.setItem('userLogged', '0');
    sessionStorage.setItem('userID', 'undefined');

    /* we also need to clear Invoice from Storage */
    this._invoice.unsetInvoice();
  }

  userLogged(): boolean {
    return (sessionStorage.getItem('userLogged') === '1');
  }

  userLoginFailed(): boolean {
    return (sessionStorage.getItem('userLogged') === '-1');
  }

  userID(): any {
    return sessionStorage.getItem('userID');
  }
}
