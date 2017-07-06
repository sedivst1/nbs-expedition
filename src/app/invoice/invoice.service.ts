import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class InvoiceService {

  constructor(private _http: Http) {}

  getInvoicesData(id): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/dispatch_lists/' + id)
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

  setInvoice(invoiceID): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/dispatch_lists/' + invoiceID)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              sessionStorage.setItem('invoiceSet', '1');
              sessionStorage.setItem('invoiceID', invoiceID);
              observer.next(data.result);
            } else {
              sessionStorage.setItem('invoiceSet', '-1');
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

  unsetInvoice() {
    sessionStorage.setItem('invoiceSet', '0');
    sessionStorage.setItem('invoiceID', 'undefined');
  }

  /* returns whether Invoice is set */
  invoiceSet(): boolean {
    return (sessionStorage.getItem('invoiceSet') === '1');
  }

  invoiceSetFailed(): boolean {
    return (sessionStorage.getItem('invoiceSet') === '-1');
  }

  invoiceID(): any {
    return sessionStorage.getItem('invoiceID');
  }
}
