import { Component } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'home',
  templateUrl: './home.template.html'
})
export class Home {
  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/api/test')
      .subscribe(res => {
        console.log(res);
      });
  }
}
