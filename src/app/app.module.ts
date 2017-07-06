import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ROUTES } from './app.routes';
import { App } from './app.component';

import { AuthService } from './auth/auth.service';
import { InvoiceService } from './invoice/invoice.service';
import { ItemsService } from './items/items.service';
import { ServerCallbacksService } from './server-callbacks/serverCallbacks.service';

import { Login } from './Login/login.component';
import { Invoices } from './invoices/invoices.component';
import { UserInterface } from './user-interface/user-interface.component';
import { InvoiceItems } from './invoice-items/invoice-items.component';

import 'rxjs/add/operator/map';

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    Login,
    Invoices,
    UserInterface,
    InvoiceItems
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  providers: [
    AuthService,
    InvoiceService,
    ItemsService,
    ServerCallbacksService
  ]
})
export class AppModule {
  constructor() {}
}
