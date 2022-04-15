import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  constructor() {
    this.profileMenuItems = new Array();
    this.myOrderMenuItems = new Array();
  }

  ngOnInit(): void {
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

}
