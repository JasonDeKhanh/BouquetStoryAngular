import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { BundleService } from '../services/bundle.service';
import { Bundle } from '../models/bundle';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';
import { Product } from '../models/product';

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
                // this.productQuantityMapInitializer();
            },
            error: (error) => {
                console.log('********** AllBundlesComponent.ts: ' + error);
            }
        });
    }

    // productQuantityMapInitializer() {
    //     for (var bundle of this.bundles) {
    //         let curProductQuantities = bundle.productQuantities;
    //         // for (var productQuantity of bundle.productQuantities!) {
    //         //     productQuantity[0].toString();
    //         // }
    //         console.log(curProductQuantities);
    //         for (var product of bundle.products!) {
    //             console.log(curProductQuantities!.get(product));
    //         }
    //     }
    // }

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

        // get total price
        // var unitPriceBundle: number;
        // unitPriceBundle = 0;
        // for (var product of bundle?.products ? bundle.products : new Array()) {

        //     // console.log("map.get stuff: " + bundle.productQuantities!.get(product));
        //     // console.log("check map thingy: " + bundle!.productQuantities['entity.AddOn[ id=1 ]']);

        //     var curProductQuantity = 1;

        //     let productQuantityMap = new Map<Product, number>();
        //     // for (var value in bundle.productQuantities) {
        //     //     productQuantityMap.set(value, bundle.productQuantities[value]);
        //     // }


        //     // for (var bundle of this.bundles) {
        //     //     let jsonProductQuantities = bundle.productQuantities;
        //     //     // for (var productQuantity of bundle.productQuantities!) {
        //     //     //     productQuantity[0].toString();
        //     //     // }
        //     //     console.log(jsonProductQuantities);
        //     // }


        //     // productQuantityMap = bundle.productQuantities!;
        //     curProductQuantity = productQuantityMap.get(product)!;
        //     // };
        //     unitPriceBundle += (product.unitPrice * curProductQuantity);
        // }
        // if item is not already inside cart,
        // add to cart
        if (itemAlreadyAdded === false) {
            console.log("cartLineItems.length?? " + cartLineItems.length)
            newLineItem = new SaleTransactionLineItem(1, cartLineItems.length + 1, 1, 100);
            // newLineItem = new SaleTransactionLineItem(1, cartLineItems.length, 1, bundle.price);
            newLineItem.item = bundle;
            cartLineItems.push(newLineItem);
            this.sessionService.setCartLineItems(cartLineItems);
            console.log("inside here, item not already inside cart")
            console.log("line item price: " + newLineItem.unitPrice)
            console.log("bundle total price: " + bundle.totalPrice)
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
