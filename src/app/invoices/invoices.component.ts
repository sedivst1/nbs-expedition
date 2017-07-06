import { Component } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'invoices',
  templateUrl: 'invoices.template.html',
  styleUrls: [ 'invoices.style.css' ]
})

export class Invoices {

  constructor(private _invoiceService: InvoiceService,
              private _router: Router) {}

  setInvoice(invoiceID) {
    this._invoiceService.setInvoice(invoiceID).subscribe(
      data => {
        /* TODO: should pair user-invoice
         * (when power loss, user should get this invoice automatically) */
        this._router.navigate(['/invoices/' + invoiceID]);
      },
      error => {
        (<HTMLInputElement>document.getElementById('invoiceID')).value = '';
      }
    );
    return false;
  }

  /* returns true, if invoice was set, but failed, otherwise returns false */
  invoiceSetFailed() {
    return this._invoiceService.invoiceSetFailed();
  }

  ngOnInit() {
    document.getElementById('invoiceID').focus();
  }
}
