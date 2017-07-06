import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { ItemsService } from '../items/items.service';
import { AuthService } from '../auth/auth.service';
import { ServerCallbacksService } from '../server-callbacks/serverCallbacks.service';

@Component({
  selector: 'invoice-items',
  templateUrl: 'invoice-items.template.html',
  styleUrls: [ 'invoice-items.style.css', '../user-interface/user-interface.style.css' ]
})

export class InvoiceItems implements OnInit {

  /* user information */
  private userType: number = null;

  /* invoice information */
  private customerName: string = null;
  private code1: string = null;
  private code2: string = null;

  /* items information */
  private originalData: any = null;
  private items: any = null;

  /* other */
  private finished: boolean = false;
  private warning: string = '';
  private actualItem: any = null;
  private timeoutMs: number = 2000;

  constructor(private _authService: AuthService,
              private _invoiceService: InvoiceService,
              private _itemsService: ItemsService,
              private _serverCallbacksService: ServerCallbacksService,
              private _router: Router) {}

  ngOnInit() {
    document.getElementById('itemInput').focus();
    this.getInvoiceData();
    this.getItemsData();
    this.getUsersRole();
  }

  /* gets information about invoice  */
  getInvoiceData() {
    let invoiceID =  this._invoiceService.invoiceID();

    this._invoiceService.getInvoicesData(invoiceID)
      .subscribe(
        data => {
          this.customerName = data.customerName;
          this.code1 = data.code1;
          this.code2 = data.code2;
        },
        error => {
          this.customerName = error;
          this.code1 = error;
          this.code2 = error;
        }
      );
  }

  /* gets information about order items */
  getItemsData() {
    let invoiceID =  this._invoiceService.invoiceID();

    this._itemsService.getItemsByInvoice(invoiceID)
      .subscribe(
        data => {
          this.originalData = JSON.parse(JSON.stringify(data)); // makes clone (not by reference)
          this.items = data;
          this.checkItemsPicture(); // we need to check, if picture was included
        },
        error => {
          console.log('Error in function getItemsData : ' + error);
        }
      );
  }

  /* checks, if items picture contains pictureUrl, if not, we send http request to another api */
  checkItemsPicture() {
    for (let item of this.items) {
      if (typeof(item.productAttachmentUrl) === 'undefined' || item.productAttachmentUrl === '') {
        let itemId =  item.id;
        this._itemsService.getAnotherItemsData(itemId)
          .subscribe(
            data => {
              item.productAttachmentUrl = data.productAttachmentUrl;
            },
            error => {
              console.log('Error in function checkItemsPicture : ' + error);
            }
          );
      }
    }
  }

  /* gets information about user role (if buttonOK should be enabled or not) */
  getUsersRole() {
    let userID = this._authService.userID();

    this._authService.getUsersData(userID).subscribe(
      data => {
        this.userType = data.type;
      },
      error => {
        console.log('error: ' + error);
      }
    );
  }

  /* when user clicks on button to finish order */
  onClickDone() {
    this._serverCallbacksService.orderFinished(this.originalData, this.items).subscribe(
      data => {
        this._invoiceService.unsetInvoice();
        this._router.navigate(['/invoices']);
      },
      error => {
        console.log('Order cannot be finished now!: ' + error);
      }
    );
  }

  /* when user scans order-item */
  onKeyUpEnter(itemID) {
    this.resolveIt(itemID); // takes care of (almost) everything
  }

  /* takes care of doing appropriate process to pick and pack item, etc.
   * letting server know, that item is about to be picked, checks how many
   * items is about to be picked and so on */
  resolveIt(itemID) {
    for (let item of this.items) {
      if (item.productBarcode === itemID) {

        if (item.productAmount === 0) {
          this.modalWarning('Tento předmět je již zabalen.', 'itemInput');

        } else if (item.productAmount === 1) {
          this.pickItems(item, 1);
          (<HTMLInputElement>document.getElementById('itemInput')).value = '';
          document.getElementById('itemInput').focus();

        } else if (item.productAmount >= 1) {
          this.actualItem = item;
          this.modalAmount();

        } else {
          console.log('en error has occured');
        }
        return;
      }
    }
    this.modalWarning('Špatný EAN kód.', 'itemInput');
  }

  /* letting server know, that item is about to be picked, if success,
   * than decrease count of left amount */
  pickItems(item, count) {
    this._serverCallbacksService.itemRequired(item, count).subscribe(
      data => {
        /* TODO: should save it
         * (when power loss, user should continue here automatically) */
        this.decreaseAmountBy(item, data);
      },
      error => {
        console.log('You cannot take this item!');
      }
    );
  }

  /* decreases count of left amount */
  decreaseAmountBy(item, count) {
    item.productAmount -= count;

    if (item.productAmount === 0) {
      /* all this code does, is:
       * finds row of product and applies class 'finished-row',
        * changes glyphicon-remove in 'Zabaleno' to glyphicon-ok */
      let allEANs = document.getElementsByClassName('EAN');
      let i;
      for (i = 0; i < allEANs.length; i++) {
        if (allEANs[i].innerHTML.trim() === item.productBarcode.toString()) {
          let parentElement = allEANs[i].parentElement;
          parentElement.classList.add('finished-row');

          let glyphiconSpan = parentElement.querySelector('.glyphicon');
          glyphiconSpan.classList.remove('glyphicon-remove');
          glyphiconSpan.classList.add('glyphicon-ok');

          break;
        }
      }
    }

    if (this.isCompleted()) {
      this.finished = true;
    }
  }

  /* returns true, if order is done */
  isCompleted() {
    for (let item of this.items) {
      if (item.productAmount !== 0) {
        return false;
      }
    }
    return true;
  }

  /* From here below, only modal actions appears */

  modalWarning(str, inputId) {
    document.getElementById(inputId).blur();
    this.warning = str;
    let modal = document.getElementById('modalWarning');
    modal.style.display = 'block';

    setTimeout(function(){
      modal.style.display = 'none';
      (<HTMLInputElement>document.getElementById(inputId)).value = '';
      document.getElementById(inputId).focus();
    }, this.timeoutMs);
  }

  modalAmount() {
    let modal = document.getElementById('modalForm');
    modal.style.display = 'block';
    document.getElementById('inputAmount').focus();
  }

  btnAmountAdd(num) {
    (<HTMLInputElement>document.getElementById('inputAmount')).value += num;
    document.getElementById('inputAmount').focus();
  }

  btnAmountClear() {
    (<HTMLInputElement>document.getElementById('inputAmount')).value = '';
    document.getElementById('inputAmount').focus();
  }

  btnAmountOK() {
    let value = (<HTMLInputElement>document.getElementById('inputAmount')).value;
    let valueParsed = parseInt(value, 10);

    if (isNaN(valueParsed)) {
      this.modalWarning('Musíte zadat číslo', 'inputAmount');

    }else if (valueParsed > this.actualItem.productAmount) {
      this.modalWarning('Počet nesmí být vyšší než ' + this.actualItem.productAmount,
        'inputAmount');

    } else {
      document.getElementById('modalForm').style.display = 'none';
      (<HTMLInputElement>document.getElementById('itemInput')).value = '';
      (<HTMLInputElement>document.getElementById('inputAmount')).value = '';
      document.getElementById('itemInput').focus();
      this.pickItems(this.actualItem, valueParsed);
    }
  }
}
