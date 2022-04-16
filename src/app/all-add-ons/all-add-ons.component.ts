import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { AddOnService } from '../services/add-on.service';
import { AddOn } from '../models/add-on';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';
import { Product } from '../models/product';

@Component({
	selector: 'app-all-add-ons',
	templateUrl: './all-add-ons.component.html',
	styleUrls: ['./all-add-ons.component.css']
})
export class AllAddOnsComponent implements OnInit {

	addOns: AddOn[];

	sortOptions: SelectItem[];

	sortOrder: number;

	sortField: string;

	sortKey: string;

	constructor(private primengConfig: PrimeNGConfig,
	private addOnService: AddOnService,
	private sessionService: SessionService) {
		this.addOns = new Array();

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

		// call AddOnService to get All addons here
		this.addOnService.getAddOns().subscribe({
			next: (response) => {
				this.addOns = response;
				// this.productQuantityMapInitializer();
			},
			error: (error) => {
				console.log('********** AllAddOnsComponent.ts: ' + error);
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
            newLineItem = new SaleTransactionLineItem(1, cartLineItems.length + 1, 1, 100);
            // newLineItem = new SaleTransactionLineItem(1, cartLineItems.length, 1, addon.price);
            newLineItem.item = addOn;
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
