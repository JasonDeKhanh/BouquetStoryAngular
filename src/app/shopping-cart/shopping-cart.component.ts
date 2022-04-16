import { Component, OnInit } from '@angular/core';

import { SaleTransaction } from '../models/sale-transaction';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

import { SessionService } from '../services/session.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    saleTransactionLineItems: SaleTransactionLineItem[];
    totalLineItem: number;
    totalQuantity: number;
    totalPriceAmount: number;
    collectionDateTime: Date;
    isSelfPickup: boolean;
    deliveryAddress: string;
    isPreorder: boolean;

    constructor(public sessionService: SessionService) {

        this.totalLineItem = 0;
        this.totalQuantity = 0;
        this.totalPriceAmount = 0;
        this.collectionDateTime = new Date();
        this.isSelfPickup = false;
        this.deliveryAddress = "";
        this.isPreorder = false;

        this.saleTransactionLineItems = new Array();

    }

    ngOnInit(): void {
        this.saleTransactionLineItems = this.sessionService.getCartLineItems();

        this.totalLineItem = this.saleTransactionLineItems.length;
        for (var lineItem of this.saleTransactionLineItems) {
            this.totalQuantity += lineItem.quantity ? lineItem.quantity : 0;
            this.totalPriceAmount += (lineItem.quantity && lineItem.unitPrice) ? lineItem.unitPrice * lineItem.quantity : 0;
        }

        console.log("line items: " + this.saleTransactionLineItems.toString());
        console.log("lineItem[0]: " + this.saleTransactionLineItems[0]?.item?.itemId);
        console.log("lineItem[0] serial num: " + this.saleTransactionLineItems[0]?.serialNumber);

    }

    getSubtotal(lineItem: SaleTransactionLineItem) {
        return lineItem!.unitPrice! * lineItem!.quantity!;
    }

    updateTotalStuff(event: any) {
        var tempQuantity = 0;
        var tempPriceAmount = 0;
        var index = 1;
        for (var lineItem of this.saleTransactionLineItems) {
            lineItem.serialNumber = index;
            index += 1;
            tempQuantity += lineItem.quantity!;
            tempPriceAmount += lineItem.quantity! * lineItem.unitPrice!;
        }
        this.totalQuantity = tempQuantity;
        this.totalPriceAmount = tempPriceAmount;



        this.sessionService.setCartLineItems(this.saleTransactionLineItems)
    }

    removeCartItem(lineItem: SaleTransactionLineItem) {
        this.saleTransactionLineItems.forEach((lineItemVar, index) => {
            if (lineItem === lineItemVar) {
                this.saleTransactionLineItems.splice(index, 1);
            }
        })
        this.sessionService.setCartLineItems(this.saleTransactionLineItems)
        this.updateTotalStuff(null);
    }

    doCheckout() {
        var newSaleTransaction: SaleTransaction;
        newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
            this.totalPriceAmount, new Date(), this.collectionDateTime, this.isSelfPickup,
            this.deliveryAddress, false, this.isPreorder, false);

        for (var lineItem of this.saleTransactionLineItems) {
            newSaleTransaction.saleTransactionLineItems?.push(lineItem);
        }

        // call saletransactionservice
        // createNewSaleTransaction(customerId, newSaleTransaction)

        // catch error or somethign idk


        // registered checkout and unregistered checkout??

    }

}
