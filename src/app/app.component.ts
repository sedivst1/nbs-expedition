/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {Router} from "@angular/router";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  templateUrl: 'app.template.html'
})
export class App {
  constructor() {}
}
