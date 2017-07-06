import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ItemsService {

  constructor(private _http: Http) {}

  getItemsByInvoice(invoiceID): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/items/' + invoiceID)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              observer.next(data.result);
            } else {
              console.log('error in service response');
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

  /* sends http request to another api-path to get more data about item,
   * for example, if there is no pictureUrl in /api/items/:id, we need to
    * get it from this api-path */
  getAnotherItemsData(itemID): Observable<any> {
    return Observable.create(observer => {
      this._http.get('/api/items-picture/' + itemID)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              observer.next(data.result);
            } else {
              console.log('error in service response');
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
}
