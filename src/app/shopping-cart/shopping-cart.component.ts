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
import { DatePipe } from '@angular/common';;
import { AddressService } from '../services/address.service';
import { CreditCardService } from '../services/credit-card.service';
import { Item } from '../models/item';

import {DropdownModule} from 'primeng/dropdown';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css'],
    providers: [MessageService, ConfirmationService,DatePipe, DropdownModule]
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
    newCustomerEmail : string;

    newUsername : string;
    newFirstName : string;
    newLastName : string;

    addresses : Address[] | undefined;
    creditCards : CreditCard[] | undefined;
    items: number[] | undefined;

    displayRegisteredGuestCheckoutDialog: boolean = false;
    displayUnregisteredGuestCheckoutDialog: boolean = false;

    constructor(public sessionService: SessionService,
                private messageService: MessageService, 
                private confirmationService: ConfirmationService,
                private saleTransactionService : SaleTransactionService,
                private creditCardService : CreditCardService,
                private addressService : AddressService) {

        this.totalLineItem = 0;
        this.totalQuantity = 0;
        this.totalPriceAmount = 0;
        this.collectionDateTime.setDate(new Date().getDate() + 3);
        this.isSelfPickup = false;
        this.deliveryAddress = "";
        this.isPreorder = false;
        this.minDateValue.setDate(new Date().getDate() + 3);
   
        this.saleTransactionLineItems = new Array();

        this.addressService.getAddresses(this.sessionService.getUsername()).subscribe({
            next:(response)=>{
                this.addresses = response;
            },
            error:(error)=>{
                console.log('********** ViewAllAddress.ts: ' + error);
            }
        });

        this.creditCardService.getcreditCards(this.sessionService.getUsername()).subscribe({
            next:(response)=>{
                this.creditCards = response;
            },
            error:(error)=>{
                console.log('********** ViewAllAddress.ts: ' + error);
            }
        });
        

    }

    ngOnInit(): void {
        this.saleTransactionLineItems = this.sessionService.getCartLineItems();

        this.totalLineItem = this.saleTransactionLineItems.length;

        
        this.items = new Array<number>(this.saleTransactionLineItems.length);
        
        for(let i = 0; i<this.saleTransactionLineItems.length;i++){

            this.items[i] = this.saleTransactionLineItems[i].item.itemId;
            // console.log("---->"+this.items[i].itemId)
        }

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


    doRegisteredCheckout(newSaleTransactionItems: SaleTransactionLineItem[]) {
        this.displayRegisteredGuestCheckoutDialog = true;

        this.saleTransactionLineItems = newSaleTransactionItems;

        for (var lineItem of newSaleTransactionItems) {
            console.log("==>" + lineItem.item!.itemId);
        }

        // call saletransactionservice
        // createNewSaleTransaction(customerId, newSaleTransaction)

        // catch error or somethign idk


        // registered checkout and unregistered checkout??

    } 

    doUnregisteredCheckout(newSaleTransactionItems : SaleTransactionLineItem[] ){
        this.displayUnregisteredGuestCheckoutDialog = true;

        this.saleTransactionLineItems = newSaleTransactionItems;

        for (var lineItem of newSaleTransactionItems) {
            console.log("==>"+lineItem.item.itemId);
        }
    }

    registeredCheckout() {
        const datepipe: DatePipe = new DatePipe('en-US')

        let transactionDate = new Date().toISOString();
        let collectionDate = this.collectionDateTime.toISOString();
        let username = this.sessionService.getUsername();
        let firstName = this.sessionService.getCurrentCustomer().firstName;
        let lastName = this.sessionService.getCurrentCustomer().lastName;

        var newSaleTransaction: SaleTransaction;

        let validaCheckOut = false;

        if(this.isSelfPickup==true) {
            console.log("=== register self pickup checkout === ")
            validaCheckOut = true;
            
            newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
                this.totalPriceAmount, transactionDate, collectionDate, this.isSelfPickup,
                null, false, this.isPreorder, false);
            
        } else if(this.isSelfPickup==false && this.address.line!='' && this.address.postCode!=''){
            console.log("=== register delivery checkout === ")
            validaCheckOut = true;
            this.deliveryAddress = this.address.line + "; Postal Code: "+this.address.postCode;
            
            newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
                this.totalPriceAmount, transactionDate, collectionDate, this.isSelfPickup,
                this.deliveryAddress, false, this.isPreorder, false);
        }

        if(validaCheckOut) {
            this.saleTransactionService.createNewSessionService(username, firstName, lastName, newSaleTransaction, 
                this.saleTransactionLineItems, this.items).subscribe({
                next: (response) => {
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Checkout!', life: 3000});
                    this.address = new Address();
            
                    this.saleTransactionLineItems = [];
            
                    this.sessionService.setCartLineItems(this.saleTransactionLineItems);
                    this.totalLineItem = 0;
                    this.totalPriceAmount = 0;
                    window.location.reload();

                    this.displayRegisteredGuestCheckoutDialog = false;

                },
                error: (error) => {
                    //   this.message = "An error has occurred while registering new account: \n" + error;
                    // this.message = "This email is already registered as a customer!";
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Checkout!', life: 3000});
                    console.log('********** Checkout.ts: ' + error);
                }
            })
        }
                
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

    unregisteredGuestCheckout() {
        const datepipe: DatePipe = new DatePipe('en-US')

        let transactionDate = new Date().toISOString();
        let collectionDate = this.collectionDateTime.toISOString();
        let username = this.newUsername;
        let firstName = this.newFirstName
        let lastName = this.newLastName

        if(username!='' && firstName!='' && lastName!='') {

            var newSaleTransaction: SaleTransaction;

            let validaCheckOut = false;

            if(this.isSelfPickup==true) {
                console.log("=== unregister self pickup checkout === ")
                validaCheckOut = true;
                
                newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
                    this.totalPriceAmount, transactionDate, collectionDate, this.isSelfPickup,
                    null, false, this.isPreorder, false);
                
            } else if(this.isSelfPickup==false && this.address.line!='' && this.address.postCode!=''){
                console.log("=== unregister delivery checkout === ")
                validaCheckOut = true;
                this.deliveryAddress = this.address.line + "; Postal Code: "+this.address.postCode;
                
                newSaleTransaction = new SaleTransaction(1, this.totalLineItem, this.totalQuantity,
                    this.totalPriceAmount, transactionDate, collectionDate, this.isSelfPickup,
                    this.deliveryAddress, false, this.isPreorder, false);
            }

            if(validaCheckOut) {
                this.saleTransactionService.createNewSessionService(username, firstName, lastName, newSaleTransaction, 
                    this.saleTransactionLineItems, this.items).subscribe({
                    next: (response) => {
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Checkout!', life: 3000});
                        this.address = new Address();
                
                        this.saleTransactionLineItems = [];
                        this.sessionService.setCartLineItems(this.saleTransactionLineItems);
                        this.displayUnregisteredGuestCheckoutDialog = false;
                        window.location.reload();
                        
                    },
                    error: (error) => {
                        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Checkout!', life: 3000});
                        console.log('********** Checkout.ts: ' + error);
                    }
                })
            }
                    
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


}
