import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    items: MenuItem[];

    constructor() {

        this.items = new Array();

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
}
