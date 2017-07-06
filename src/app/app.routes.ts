import { Routes } from '@angular/router';
import { Login } from './Login/login.component';
import { Invoices } from './invoices/invoices.component';
import { InvoiceItems } from './invoice-items/invoice-items.component';


export const ROUTES: Routes = [
  // Does not require authentication
  { path: 'login', component: Login },
  { path: 'invoices', component: Invoices },
  { path: 'invoices/:invoice-id', component: InvoiceItems},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
