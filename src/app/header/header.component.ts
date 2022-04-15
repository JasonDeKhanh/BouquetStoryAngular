import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import { CustomerService } from '../services/customer.service';
import { RegisteredGuest } from '../models/registered-guest';

import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    items: MenuItem[];
    userItems: MenuItem[];

    username: string | undefined;
    password: string | undefined;
    loginError: boolean;
    errorMessage: string | undefined;

    newCustomer: RegisteredGuest;
    registerSuccess: boolean;
    registerError: boolean;
    message: string | undefined;

    displayLoginDialog: boolean = false;
    displayRegisterDialog: boolean = false;

    constructor(private router: Router,
        public sessionService: SessionService,
        private customerService: CustomerService,) {

        this.items = new Array();
        this.userItems = new Array();
        this.loginError = false;

        this.newCustomer = new RegisteredGuest();

        this.registerSuccess = false;
        this.registerError = false;
    }

    ngOnInit(): void {
        this.items = [
            // Home
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: ["/index"]
            },

            // Create Your Own Bouquet button
            {
                label: 'Create Your Own Bouquet',
            },
            // Premade Bouquets
            {
                label: 'Premade Bouquets',
            },
            // Add Ons
            {
                label: 'Add Ons',
            },
            // Gift Cards
            {
                label: 'Gift Cards',
            },
            // Bundles
            {
                label: 'Bundles',
                routerLink: ["/bundles"]
            },
            // FLower Gallery
            {
                label: 'Flowers Gallery',
                routerLink: ["/flowerGallery"]
            },
            // Others
            {
                label: 'More',
                items: [
                    {
                        label: 'About Us',
                    },
                    {
                        label: 'FAQ',
                    },
                ],
            },
        ]; // end of items

        this.userItems = [
            {
                label: 'My Profile',
                routerLink: ["/myProfile"]

            },
            {
                label: 'My Orders',
                routerLink: ["/myOrders"]

            },
            {
                separator: true
            },
            {
                label: 'Logout',
                command: () => this.customerLogout(),
            },

        ]
    }

    customerLogin(): void {
        if (this.username != null && this.password != null) {

            this.sessionService.setUsername(this.username);
            this.sessionService.setPassword(this.password);

            this.customerService.customerLogin(this.username, this.password).subscribe({
                next: (response) => {
                    let customer: RegisteredGuest = response;

                    if (customer != null) {
                        this.sessionService.setIsLogin(true);
                        this.sessionService.setCurrentCustomer(customer);
                        this.loginError = false;
                        
                        this.router.navigate(["/index"]);
                        window.location.reload();
                    }
                    else {
                        this.loginError = true;
                    }
                },
                error: (error) => {
                    this.loginError = true;
                    this.errorMessage = "You have entered wrong email or password!"
                }
            });
        }
    }

    customerLogout(): void {
        this.sessionService.setIsLogin(false);
        this.sessionService.setCurrentCustomer(null);
        window.location.reload();
        this.router.navigate(["/index"]);
    }

    registerNewCustomer() {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        var isEmailValid: boolean = regexp.test(this.newCustomer.email!);

        if (this.newCustomer.firstName != null && this.newCustomer.lastName != null &&
            this.newCustomer.email != null && this.newCustomer.password != null && isEmailValid) {
            this.customerService.createNewCustomer(this.newCustomer).subscribe({
                next: (response) => {
                    this.registerSuccess = true;
                    this.registerError = false;
                    this.message = "You have successfully registered a new account!";
                    this.newCustomer = new RegisteredGuest();
                },
                error: (error) => {
                    this.registerError = true;
                    this.registerSuccess = false;
                    //   this.message = "An error has occurred while registering new account: \n" + error;
                    this.message = "This email is already registered as a customer!";

                    console.log('********** RegisterNewAccount.ts: ' + error);
                }
            })
        }

    }

    showLoginDialog() {
        this.displayLoginDialog = true;
        this.displayRegisterDialog = false;
        this.loginError = false;
        this.username = undefined;
        this.password = undefined;
    }
    showRegisterDialog() {
        this.displayRegisterDialog = true;
        this.displayLoginDialog = false;
        this.registerSuccess = false;
        this.registerError = false;
        this.newCustomer = new RegisteredGuest();
    }

}
