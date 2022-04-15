import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { RegisteredGuest } from '../models/registered-guest';
import { CustomerService } from '../services/customer.service';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  currentCustomer: RegisteredGuest = new RegisteredGuest();

  displayUpdateDialog: boolean = false;
  displayPasswordDialog: boolean = false;
  registerSuccess: boolean;
  registerError: boolean;
  message: string | undefined;
  newPassword: string | undefined;

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  constructor(public sessionService: SessionService,
    private customerService: CustomerService) {
    this.currentCustomer = sessionService.getCurrentCustomer();
    this.registerError = false;
    this.registerSuccess = false;
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

  editProfile() {
    this.message = "";
    this.registerSuccess = false;
    this.registerError = false;
    this.displayUpdateDialog = true;
  }


  changePassword() {
    this.message = "";
    this.displayPasswordDialog = true;
  }

  updateCustomer() {

    if (this.currentCustomer.firstName != null && this.currentCustomer.lastName != null &&
      this.currentCustomer.email != null) {
      this.customerService.updateCustomer(this.currentCustomer).subscribe({
        next: (response) => {
          this.registerSuccess = true;
          this.registerError = false;
          this.message = "You have successfully updated your account!";
          this.currentCustomer = response;

          this.sessionService.setCurrentCustomer(response);
        },
        error: (error) => {
          this.registerError = true;
          this.registerSuccess = false;
          //   this.message = "An error has occurred while registering new account: \n" + error;
          this.message = "An unexpected error occured during update!";

          console.log('********** RegisterNewAccount.ts: ' + error);
        }
      })
    }

  }

  updatePassword() {
    if (this.newPassword != undefined && this.newPassword != "") {
      if (this.newPassword.length > 8) {
        this.currentCustomer.password = this.newPassword;
        this.customerService.updatePassword(this.currentCustomer).subscribe({
          next: (response) => {
            this.registerSuccess = true;
            this.registerError = false;
            this.message = "You have successfully change your password!";
          },
          error: (error) => {
            this.registerError = true;
            this.registerSuccess = false;
            //   this.message = "An error has occurred while registering new account: \n" + error;
            this.message = "An unexpected error occured during update!";

            console.log('********** UpdatePassword.ts: ' + error);
          }
        })
      }
    }
  }
}
