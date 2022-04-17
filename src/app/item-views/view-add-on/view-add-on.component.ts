import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { AddOnService } from '../../services/add-on.service';
import { AddOn } from '../../models/add-on';

import { SaleTransactionLineItem } from '../../models/sale-transaction-line-item';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-add-on',
  templateUrl: './view-add-on.component.html',
  styleUrls: ['./view-add-on.component.css'],
  providers: [MessageService]
})
export class ViewAddOnComponent implements OnInit {
  addOnId: string | null;
  addOnToView: AddOn | null;
  retrieveAddOnError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public addOnService: AddOnService,
              private sessionService: SessionService,
              private messageService: MessageService)
    {
      this.addOnId = null;
      this.addOnToView = new AddOn();
      this.retrieveAddOnError = false;
    }

  ngOnInit(): void {
    this.addOnId = this.activatedRoute.snapshot.paramMap.get('addOnId');

    if(this.addOnId != null) {
      this.addOnService.getAddOnByAddOnId(parseInt(this.addOnId)).subscribe({
        next:(response)=>{
          this.addOnToView = response;
        },
        error:(error)=>{
          this.retrieveAddOnError = true;
        }
      });
    }
  }

  // ADD TO CART
  addProductToCart(addOn: AddOn) {
    let cartLineItems: SaleTransactionLineItem[];
    cartLineItems = this.sessionService.getCartLineItems();
    var itemAlreadyAdded: boolean;
    itemAlreadyAdded = false;
    var newLineItem: SaleTransactionLineItem;
    newLineItem = new SaleTransactionLineItem();

    // check if item is already inside cart
    for (var lineItem of cartLineItems) {
        if (lineItem.item?.itemId === addOn.itemId) {
            itemAlreadyAdded = true;
            newLineItem = lineItem;
            break;
        }
    }

    if (itemAlreadyAdded === false) {
        console.log("cartLineItems.length?? " + cartLineItems.length)
        newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, addOn.unitPrice);
        newLineItem.item = addOn;
        cartLineItems.push(newLineItem);
        this.sessionService.setCartLineItems(cartLineItems);
        console.log("inside here, item not already inside cart")
        console.log("line item price: " + newLineItem.unitPrice)
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
