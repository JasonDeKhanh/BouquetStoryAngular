import { Component, OnInit } from '@angular/core';

import { SessionService } from '../services/session.service';
import { FlowerService } from '../services/flower.service';
import { ContainerService } from '../services/container.service';
import { DecorationService } from '../services/decoration.service';

import { CustomBouquet } from '../models/custom-bouquet';
import { Container } from '../models/container';
import { Flower } from '../models/flower';
import { Decoration } from '../models/decoration';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

@Component({
    selector: 'app-create-your-own-bouquet',
    templateUrl: './create-your-own-bouquet.component.html',
    styleUrls: ['./create-your-own-bouquet.component.css']
})
export class CreateYourOwnBouquetComponent implements OnInit {

    newCustomBouquet: CustomBouquet;
    newContainer: Container;

    newAddedFlowers: Flower[];
    newFlowerQuantities: Map<Flower, number>;
    totalFlowerQuantities: number;
    // newFlowerQuantities: { Flower: number }[];

    newAddedDecorations: Decoration[];
    newDecorationQuantities: Map<Decoration, number>;
    totalDecorationQuantities: number;

    allContainers: Container[];
    allFlowers: Flower[];
    allDecorations: Decoration[];

    curFlowerLimit: number;

    totalPriceAmount: number;

    constructor(private sessionService: SessionService,
        private flowerService: FlowerService,
        private containerService: ContainerService,
        private decorationService: DecorationService) {

        // this.newContainer = new Container();
        this.newAddedFlowers = new Array();
        this.newFlowerQuantities = new Map();

        this.newAddedDecorations = new Array();
        this.newDecorationQuantities = new Map();


        this.totalFlowerQuantities = 0;
        this.totalDecorationQuantities = 0;

        this.totalPriceAmount = 0;

    }

    ngOnInit(): void {
        // call ContainerService to get All conatainers here
        this.containerService.getContainers().subscribe({
            next: (response) => {
                this.allContainers = response;
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        });

        // call FlowerService to get All flowers here
        this.flowerService.getFlowers().subscribe({
            next: (response) => {
                this.allFlowers = response;
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        });

        // call DecorationService to get All decorations here
        this.decorationService.getDecorations().subscribe({
            next: (response) => {
                this.allDecorations = response;
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        });
    }

    addContainer(container: Container) {
        this.newContainer = container;
        this.curFlowerLimit = this.newContainer.flowerLimit;
        this.newAddedFlowers = new Array();
        this.totalFlowerQuantities = 0;
        this.totalDecorationQuantities = 0;

        this.totalPriceAmount = container.unitPrice;
    }

    // add one flower
    addOneFlower(flower: Flower) {

        var alreadyAdded: boolean;
        alreadyAdded = false;
        for (var flowerIn of this.newAddedFlowers) {
            if (flower === flowerIn) {
                alreadyAdded = true;
            }
        }
        if (alreadyAdded === false) {
            this.newAddedFlowers.push(flower);
            this.newFlowerQuantities.set(flower, 1);
        }
        else {
            var curFlowerQty = this.newFlowerQuantities.get(flower);
            this.newFlowerQuantities.set(flower, 1 + curFlowerQty);
        }

        this.curFlowerLimit -= 1;
        this.totalFlowerQuantities += 1;

        this.totalPriceAmount += flower.unitPrice;


        console.log("newAddedFlowers: " + this.newAddedFlowers.toString());
        console.log("cur flower qty: " + this.newFlowerQuantities.get(flower))
        console.log("Flower: " + flower.name + ", qty: " + this.newFlowerQuantities.get(flower))
    }

    // remove flower from added flower list
    removeFlowerFromAddedList(flower: Flower) {
        var tempFlowers: Flower[];
        // tempFlowers = this.newAddedFlowers.slice();
        tempFlowers = new Array();

        // remove flower from newAddedFlowers lol sry i havent slept in 17 hours
        for (var flowerIn of this.newAddedFlowers) {
            if (flower != flowerIn) {
                tempFlowers.push(flowerIn);
            }
        }
        this.newAddedFlowers = tempFlowers.slice();

        var qtyOfFlowerToRemove = this.newFlowerQuantities.get(flower);
        this.totalFlowerQuantities -= qtyOfFlowerToRemove;
        this.curFlowerLimit += qtyOfFlowerToRemove;
        this.newFlowerQuantities.delete(flower);

        this.totalPriceAmount -= flower.unitPrice * qtyOfFlowerToRemove;

    }


    // add one decoration
    addOneDecoration(decoration: Decoration) {

        var alreadyAdded: boolean;
        alreadyAdded = false;
        for (var decorationIn of this.newAddedDecorations) {
            if (decoration === decorationIn) {
                alreadyAdded = true;
            }
        }

        if (alreadyAdded === false) {
            this.newAddedDecorations.push(decoration);
            this.newDecorationQuantities.set(decoration, 1);
        }
        else {
            var curDecorationQty = this.newDecorationQuantities.get(decoration);
            this.newDecorationQuantities.set(decoration, 1 + curDecorationQty);
        }
        this.totalDecorationQuantities += 1;

        this.totalPriceAmount += decoration.unitPrice;
    }

    // remove decoration from added flower list
    removeDecorationFromAddedList(decoration: Decoration) {
        var tempDecorations: Decoration[];
        tempDecorations = new Array();

        // remove flower from newAddedFlowers lol sry i havent slept in 17 hours
        for (var decorationIn of this.newAddedDecorations) {
            if (decoration != decorationIn) {
                tempDecorations.push(decorationIn);
            }
        }
        this.newAddedDecorations = tempDecorations.slice();

        var qtyOfDecorationToRemove = this.newDecorationQuantities.get(decoration);
        this.totalDecorationQuantities -= qtyOfDecorationToRemove;
        this.newDecorationQuantities.delete(decoration);

        this.totalPriceAmount -= decoration.unitPrice * qtyOfDecorationToRemove;

    }

    addCustomBouquetToCart() {
        console.log("inside addCustomBouquet")
        // retrieve cart
        let cartLineItems: SaleTransactionLineItem[];
        cartLineItems = this.sessionService.getCartLineItems();

        var newLineItem: SaleTransactionLineItem;
        newLineItem = new SaleTransactionLineItem();

        var newCustomBouquet: CustomBouquet;
        newCustomBouquet = new CustomBouquet();
        // set custombouquet stuff
        newCustomBouquet.creatorName = "Customer";
        newCustomBouquet.flowerQuantities = this.newFlowerQuantities;
        newCustomBouquet.decorationQuantities = this.newDecorationQuantities;
        newCustomBouquet.container = this.newContainer;
        newCustomBouquet.decorations = this.newAddedDecorations;
        newCustomBouquet.flowers = this.newAddedFlowers;


        // add to cart
        newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, this.totalPriceAmount);
        newLineItem.item = newCustomBouquet;
        cartLineItems.push(newLineItem);
        this.sessionService.setCartLineItems(cartLineItems);

        // refresh current stuff
        this.newContainer = null;
        this.newAddedDecorations = new Array();
        this.newAddedFlowers = new Array();
        this.newDecorationQuantities = new Map();
        this.newFlowerQuantities = new Map();
        this.curFlowerLimit = 0;
        this.totalPriceAmount = 0;
        this.totalDecorationQuantities = 0;
        this.totalFlowerQuantities = 0;
    }
}
