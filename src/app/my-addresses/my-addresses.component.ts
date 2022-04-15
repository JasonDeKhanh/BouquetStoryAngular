import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { RegisteredGuest } from '../models/registered-guest';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  constructor(private router: Router,
              public sessionService: SessionService,
              private customerService: CustomerService) {
    this.profileMenuItems = new Array();
    this.myOrderMenuItems = new Array();
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
        label: 'My Credit Cards'
      }
    ];

    this.myOrderMenuItems = [
      {
        label: 'My Orders',
        routerLink: ["/myOrders"]
      }
    ];
  }

  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}

}
