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

    username: string | undefined;
    password: string | undefined;
    loginError: boolean;
    errorMessage: string | undefined;

    constructor(private router: Router,
                public sessionService: SessionService,
                private customerService: CustomerService,) {

        this.items = new Array();
        this.loginError = false;
        this.username = '';
        this.password = '';
    }

    ngOnInit(): void {
        this.items = [
            // {
            //     label: 'File',
            //     icon: 'pi pi-fw pi-file',
            //     items: [
            //         {
            //             label: 'New',
            //             icon: 'pi pi-fw pi-plus',
            //             items: [
            //                 {
            //                     label: 'Bookmark',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                 },
            //                 {
            //                     label: 'Video',
            //                     icon: 'pi pi-fw pi-video',
            //                 },
            //             ],
            //         },
            //         {
            //             label: 'Delete',
            //             icon: 'pi pi-fw pi-trash',
            //         },
            //         {
            //             separator: true,
            //         },
            //         {
            //             label: 'Export',
            //             icon: 'pi pi-fw pi-external-link',
            //         },
            //     ],
            // },

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
