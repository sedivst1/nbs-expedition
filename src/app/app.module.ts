import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, Http, XHRBackend, RequestOptions} from "@angular/http";
import {RouterModule, Router} from "@angular/router";
import {ROUTES} from "./app.routes";
import {App} from "./app.component";
import {Home} from './home/home.component';
import { Strana2 } from './strana2/strana2.component';
import {Strana3} from "./strana3/strana3.component";

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    Home,
    Strana2,
    Strana3
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  providers: [
  ]
})
export class AppModule {
  constructor() {}
}
