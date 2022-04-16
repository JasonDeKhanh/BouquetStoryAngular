import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { PremadeBouquetService } from '../services/premade-bouquet.service';
import { PremadeBouquet } from '../models/premade-bouquet';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';
import { Product } from '../models/product';

@Component({
  selector: 'app-all-premade-bouquets',
  templateUrl: './all-premade-bouquets.component.html',
  styleUrls: ['./all-premade-bouquets.component.css']
})
export class AllPremadeBouquetsComponent implements OnInit {

  premadeBouquets: PremadeBouquet[];

	sortOptions: SelectItem[];

	sortOrder: number;

	sortField: string;

	sortKey: string;

  constructor(private primengConfig: PrimeNGConfig,
    private premadeBouquetService: PremadeBouquetService,
    private sessionService: SessionService) {
      this.premadeBouquets = new Array();
  
      // dataview stuff
      this.sortOptions = new Array();
      this.sortOrder = 0;
      this.sortField = "";
      this.sortKey = "";
  }

  ngOnInit(): void {
    this.sortOptions = [
			{ label: 'Price High to Low', value: '!price' },
			{ label: 'Price Low to High', value: 'price' }
		];

		this.primengConfig.ripple = true;

		// call PremadeBouquetService to get All premadeBouquets here
		this.premadeBouquetService.getPremadeBouquets().subscribe({
			next: (response) => {
				this.premadeBouquets = response;
				// this.productQuantityMapInitializer();
			},
			error: (error) => {
				console.log('********** AllPremadeBouquetsComponent.ts: ' + error);
			}
		});
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  // needs this for the search box idk
  applyFilterGlobal($event: any, dv: any) {
      dv.filterGlobal(($event.target as HTMLInputElement).value);
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
        // newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, 100);
        newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, premadeBouquet.bouquetPrice);
        newLineItem.item = premadeBouquet;
        cartLineItems.push(newLineItem);
        this.sessionService.setCartLineItems(cartLineItems);
        console.log("inside here, item not already inside cart")
        console.log("line item price: " + newLineItem.unitPrice)
        console.log("line item serial number??: " + newLineItem.serialNumber)
    }
    else // item already in cart 
    {
        console.log("inside here, item IS ALREADY inside cart")
        var curQuantity = newLineItem.quantity;

        (newLineItem.quantity && curQuantity) ? newLineItem.quantity = curQuantity + 1 : null;

        this.sessionService.setCartLineItems(cartLineItems);

    }

  }

}
