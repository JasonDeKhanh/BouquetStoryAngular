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


  }

  ngOnInit(): void {
  }

}
