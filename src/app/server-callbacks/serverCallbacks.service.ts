import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServerCallbacksService {

  constructor(private _http: Http) {}

  itemRequired(item, count): Observable<any> {
    let itemData = [];
    itemData.push(item);
    itemData.push(count);

    return Observable.create(observer => {
      this._http.post('/api/serverCallback/itemRequired', itemData)
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

  orderFinished(originalOrder, finishedOrder): Observable<any> {
    let orderData = [];
    orderData.push(originalOrder);
    orderData.push(finishedOrder);

    return Observable.create(observer => {
      this._http.post('/api/serverCallback/orderFinished', orderData)
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
