import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { BundleService } from '../services/bundle.service';
import { Bundle } from '../models/bundle';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

@Component({
    selector: 'app-all-bundles',
    templateUrl: './all-bundles.component.html',
    styleUrls: ['./all-bundles.component.css']
})
export class AllBundlesComponent implements OnInit {

    bundles: Bundle[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sortKey: string;

    constructor(private primengConfig: PrimeNGConfig,
        private bundleService: BundleService,
        private sessionService: SessionService) {
        this.bundles = new Array();

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

        // call BundleService to get All bundles here
        this.bundleService.getBundles().subscribe({
            next: (response) => {
                this.bundles = response;
            },
            error: (error) => {
                console.log('********** AllBundlesComponent.ts: ' + error);
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

    addProductToCart(bundle: Bundle) {
        var cartLineItems: SaleTransactionLineItem[];
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


        var unitPriceBundle: number;
        unitPriceBundle = 0;
        for (var product of bundle?.products ? bundle.products : new Array()) {
            unitPriceBundle += product.unitPrice;
        }
        // if item is not already inside cart,
        // add to cart
        if (itemAlreadyAdded === false) {
            newLineItem = new SaleTransactionLineItem(1, cartLineItems.length, 1, unitPriceBundle);
            newLineItem.item = bundle;
            cartLineItems.push(newLineItem);
            this.sessionService.setCartLineItems(cartLineItems);
            console.log("inside here, item not already inside cart")
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
