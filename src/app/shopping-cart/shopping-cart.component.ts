import { Component, OnInit } from '@angular/core';

import { SaleTransaction } from '../models/sale-transaction';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { SaleTransactionService } from '../services/sale-transaction.service';
import { Customer } from '../models/customer';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css'],
    providers: [MessageService, ConfirmationService,DatePipe]
})
export class ShoppingCartComponent implements OnInit {

    saleTransactionLineItems: SaleTransactionLineItem[];
    totalLineItem: number;
    totalQuantity: number;
    totalPriceAmount: number;
    collectionDateTime: Date = new Date();
    isSelfPickup: boolean;
    deliveryAddress: string;
    isPreorder: boolean;
    address : Address = new Address();
    creditCard : CreditCard = new CreditCard();
    expiryString : String = "";
    minDateValue : Date = new Date();

    displayRegisteredGuestCheckoutDialog : boolean = false;
    displayUnregisteredGuestCheckoutDialog : boolean = false;

    constructor(public sessionService: SessionService,
                private messageService: MessageService, 
                private confirmationService: ConfirmationService,
                private saleTransactionService : SaleTransactionService) {

        this.totalLineItem = 0;
        this.totalQuantity = 0;
        this.totalPriceAmount = 0;
        this.collectionDateTime.setDate(new Date().getDate() + 3);
        this.isSelfPickup = false;
        this.deliveryAddress = "";
        this.isPreorder = false;
        this.minDateValue.setDate(new Date().getDate() + 3);
        

        // this.creditCard./

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

    hideDialog() {
        this.displayRegisteredGuestCheckoutDialog = false;
        this.displayUnregisteredGuestCheckoutDialog = false;
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


    doRegisteredCheckout(newSaleTransactionItems : SaleTransactionLineItem[] ) {
        this.displayRegisteredGuestCheckoutDialog = true;

        this.saleTransactionLineItems = newSaleTransactionItems;

        for (var lineItem of newSaleTransactionItems) {
            console.log("==>"+lineItem.item.itemId);
        }

        // call saletransactionservice
        // createNewSaleTransaction(customerId, newSaleTransaction)

        // catch error or somethign idk


        // registered checkout and unregistered checkout??

    }

    registeredCheckout() {
        const datepipe: DatePipe = new DatePipe('en-US')

        let transactionDate = new Date().toISOString();
        let collectionDate = this.collectionDateTime.toISOString();



        // if(this.isSelfPickup==true) {
                console.log("ssssssssssssssssssssssssssssssssssssss")

                var newSaleTransaction: SaleTransaction;
                newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
                    this.totalPriceAmount, transactionDate, collectionDate, this.isSelfPickup,
                    null, false, this.isPreorder, false);

                this.saleTransactionService.createNewSessionService(this.sessionService.getUsername(), newSaleTransaction, this.saleTransactionLineItems).subscribe({
                    next: (response) => {
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Checkout!', life: 3000});
                        this.address = new Address();
                
                        this.saleTransactionLineItems = [];
                
                        this.displayRegisteredGuestCheckoutDialog = false;
                    },
                    error: (error) => {
                        //   this.message = "An error has occurred while registering new account: \n" + error;
                        // this.message = "This email is already registered as a customer!";
                
                        console.log('********** Checkout.ts: ' + error);
                    }
                })
                
                
        // } else if (this.totalLineItem!=0 &&  this.totalQuantity!=0 && this.totalPriceAmount!=0 &&
        //     this.isSelfPickup==false && this.address.line!="" && this.address.postCode!="") {
               
        //         this.deliveryAddress = this.address.line + "; Postal Code: " + this.address.postCode;
               
        //         var newSaleTransaction: SaleTransaction;
        //         newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
        //             this.totalPriceAmount, new Date(), this.collectionDateTime, this.isSelfPickup,
        //             this.deliveryAddress, false, this.isPreorder, false);
        // }
        
            

        for (var lineItem of this.saleTransactionLineItems) {
            console.log(lineItem.item.itemId);
        }

        console.log("totalLineItem: " + this.totalLineItem);
        console.log("totalQuantity: " + this.totalQuantity);
        console.log("totalPriceAmount: " + this.totalPriceAmount);
        console.log("collectionDateTime: " + this.collectionDateTime);
        console.log("isSelfPickup: " + this.isSelfPickup);
        console.log("deliveryAddress: " + this.deliveryAddress);
        console.log("isPreorder: " + this.isPreorder);

    }

}
