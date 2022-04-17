import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { BundleService } from '../../services/bundle.service';
import { Bundle } from '../../models/bundle';

import { SaleTransactionLineItem } from '../../models/sale-transaction-line-item';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-bundle',
  templateUrl: './view-bundle.component.html',
  styleUrls: ['./view-bundle.component.css'],
  providers: [MessageService]
})
export class ViewBundleComponent implements OnInit {
  bundleId: string | null;
  bundleToView: Bundle | null;
  retrieveBundleError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private bundleService: BundleService,
              private sessionService: SessionService,
              private messageService: MessageService)
    {
      this.bundleId = null;
      this.bundleToView = new Bundle();
      this.retrieveBundleError = false;
    }

  ngOnInit(): void {
    this.bundleId = this.activatedRoute.snapshot.paramMap.get('bundleId');

    if(this.bundleId != null) {
      this.bundleService.getBundleByBundleId(parseInt(this.bundleId)).subscribe({
        next:(response)=>{
          this.bundleToView = response;
        },
        error:(error)=>{
          this.retrieveBundleError = true;
        }
      });
    }
  }

  // ADD TO CART
  addProductToCart(bundle: Bundle) {
    let cartLineItems: SaleTransactionLineItem[];
    cartLineItems = this.sessionService.getCartLineItems();
    var itemAlreadyAdded: boolean;
    itemAlreadyAdded = false;
    var newLineItem: SaleTransactionLineItem;
    newLineItem = new SaleTransactionLineItem();

    // check if item is already inside cart
    for (var lineItem of cartLineItems) {
      if (lineItem.item?.itemId === bundle.itemId) {
        itemAlreadyAdded = true;
        newLineItem = lineItem;
        break;
      }
    }
    // if item is not already inside cart,
    // add to cart
    if (itemAlreadyAdded === false) {
      console.log("cartLineItems.length?? " + cartLineItems.length)
      // newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, 100);
      newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, bundle.unitPrice);
      newLineItem.item = bundle;
      cartLineItems.push(newLineItem);
      this.sessionService.setCartLineItems(cartLineItems);
      console.log("inside here, item not already inside cart")
      console.log("line item price: " + newLineItem.unitPrice)
      console.log("bundle total price: " + bundle.totalPrice)
      console.log("line item serial number??: " + newLineItem.serialNumber)
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Added item to cart!', life: 3000});
    }
    else // item already in cart 
    {
      console.log("inside here, item IS ALREADY inside cart")
      var curQuantity = newLineItem.quantity;

      (newLineItem.quantity && curQuantity) ? newLineItem.quantity = curQuantity + 1 : null;

      this.sessionService.setCartLineItems(cartLineItems);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Added item to cart!', life: 3000});
    }

  }

}
