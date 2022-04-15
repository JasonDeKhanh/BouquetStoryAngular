import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  constructor() {
    this.profileMenuItems = new Array();
    this.myOrderMenuItems = new Array();
  }

  ngOnInit(): void {
    this.profileMenuItems = [
      {
        label: 'My Profile'
      },
      {
        label: 'My Addresses'
      },
      {
        label: 'My Credit Cards'
      }
    ];

    this.myOrderMenuItems = [
      {
        label: 'My Orders'
      }
    ];
  }



}
