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
    isLoggedIn: boolean;

    constructor(private router: Router,
                public sessionService: SessionService,
                private customerService: CustomerService,) {

        this.items = new Array();
        this.userItems = new Array();
        this.loginError = false;
        this.username = '';
        this.password = '';
        this.isLoggedIn = sessionService.getIsLogin();
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
                label: 'My Profile'

            },
            {
                label: 'Logout',
                command: () => this.customerLogout(),
            },

        ]
    }

    customerLogin(): void
    {
        console.log(this.username)
        console.log(this.password)
        this.sessionService.setUsername(this.username);
        this.sessionService.setPassword(this.password);
                    
        this.customerService.customerLogin(this.username, this.password).subscribe({
            next:(response)=>{
                let customer: RegisteredGuest = response;

                if(customer != null)
                {
                    this.sessionService.setIsLogin(true);
                    this.sessionService.setCurrentCustomer(customer);					
                    this.loginError = false;	
                    window.location.reload();			                    					
                }
                else
                {
                    this.loginError = true;
                }
            },
            error:(error)=>{
                this.loginError = true;
                        this.errorMessage = error
            }
        });
    }

    customerLogout(): void
    {
        this.sessionService.setIsLogin(false);
        this.sessionService.setCurrentCustomer(null);
        window.location.reload();
        this.router.navigate(["/index"]);
    }

}
