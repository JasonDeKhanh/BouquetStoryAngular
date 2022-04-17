import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { PremadeBouquetService } from '../../services/premade-bouquet.service';
import { PremadeBouquet } from '../../models/premade-bouquet';
import { Flower } from "../../models/flower";
import { Container } from "../../models/container";
import { ContainerType } from "../../models/container-type";

import { SaleTransactionLineItem } from '../../models/sale-transaction-line-item';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-premade-bouquet',
  templateUrl: './view-premade-bouquet.component.html',
  styleUrls: ['./view-premade-bouquet.component.css'],
  providers: [MessageService]
})
export class ViewPremadeBouquetComponent implements OnInit {
  premadeBouquetId: string | null;
  premadeBouquetToView: PremadeBouquet | null;
  retrievePremadeBouquetError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public premadeBouquetService: PremadeBouquetService,
              private sessionService: SessionService,
              private messageService: MessageService)
    {
      this.premadeBouquetId = null;
      this.premadeBouquetToView = new PremadeBouquet();
      this.retrievePremadeBouquetError = false;
    }

  ngOnInit(): void {
    this.premadeBouquetId = this.activatedRoute.snapshot.paramMap.get('premadeBouquetId');

    if(this.premadeBouquetId != null) {
      this.premadeBouquetService.getPremadeBouquetByPremadeBouquetId(parseInt(this.premadeBouquetId)).subscribe({
        next:(response)=>{
          this.premadeBouquetToView = response;
        },
        error:(error)=>{
          this.retrievePremadeBouquetError = true;
        }
      });
    }
  }

  // ADD TO CART
  addProductToCart(premadeBouquet: PremadeBouquet) {
    let cartLineItems: SaleTransactionLineItem[];
    cartLineItems = this.sessionService.getCartLineItems();
    var itemAlreadyAdded: boolean;
    itemAlreadyAdded = false;
    var newLineItem: SaleTransactionLineItem;
    newLineItem = new SaleTransactionLineItem();

    // check if item is already inside cart
    for (var lineItem of cartLineItems) {
        if (lineItem.item?.itemId === premadeBouquet.itemId) {
            itemAlreadyAdded = true;
            newLineItem = lineItem;
            break;
        }
    }

    if (itemAlreadyAdded === false) {
        console.log("cartLineItems.length?? " + cartLineItems.length)
        newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, premadeBouquet.bouquetPrice);
        newLineItem.item = premadeBouquet;
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
