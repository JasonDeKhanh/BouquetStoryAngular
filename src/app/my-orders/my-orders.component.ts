import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { RegisteredGuest } from '../models/registered-guest';
import { CustomerService } from '../services/customer.service';
import { SaleTransactionService } from '../services/sale-transaction.service';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { SaleTransaction } from '../models/sale-transaction';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  salesTransactionDialog: boolean;
  salesTransactions : SaleTransaction[] | undefined;
  salesTransaction: SaleTransaction = new SaleTransaction();
  // submitted: boolean = false;
  salesTransactionLineItems : Array<SaleTransactionLineItem> = new Array<SaleTransactionLineItem>();

  constructor(private router: Router,
              public sessionService: SessionService,
              private customerService: CustomerService,
              private saleTransactionService : SaleTransactionService) {
    this.profileMenuItems = new Array();
    this.myOrderMenuItems = new Array();

    this.saleTransactionService.getAllSalesTransactions(this.sessionService.getUsername()).subscribe({
      next:(response)=>{
        this.salesTransactions = response;
      
      },
      error:(error)=>{
        console.log('********** ViewAllTransaction.ts: ' + error);
      }
    });
  }

  ngOnInit(): void {

    this.checkAccessRight();

    this.profileMenuItems = [
      {
        label: 'My Profile',
        routerLink: ["/myProfile"]
      },
      {
        label: 'My Addresses',
        routerLink: ["/myAddresses"]
      },
      {
        label: 'My Credit Cards',
        routerLink: ["/myCreditCards"]
      }
    ];

    this.myOrderMenuItems = [
      {
        label: 'My Orders',
        routerLink: ["/myOrders"]
      }
    ];
  }

  formationTime(time : string): string{
    return time.replace(/T/, ' ').replace(/Z\[UTC\]/, ' '). replace(/\..+/, '')
  }
  


  viewTransactionDetails(saleTransaction : SaleTransaction){
    this.salesTransactionDialog = true;
    this.salesTransaction = saleTransaction;

    
    this.salesTransactionLineItems = new Array<SaleTransactionLineItem>();

    for(var item of saleTransaction.saleTransactionLineItems)
          this.salesTransactionLineItems.push(item)
  }

  hideDialog() {
    this.salesTransactionDialog = false;
  }

  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}


}
