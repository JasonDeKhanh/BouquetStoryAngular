import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


import { FlowerService } from '../services/flower.service';
import { Flower } from '../models/flower';

@Component({
    selector: 'app-flower-gallery',
    templateUrl: './flower-gallery.component.html',
    styleUrls: ['./flower-gallery.component.css']
})

export class FlowerGalleryComponent implements OnInit {


    flowers: Flower[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sortKey: string;

    constructor(private primengConfig: PrimeNGConfig, private flowerService: FlowerService) {
        this.flowers = new Array();

        // dataview stuff
        this.sortOptions = new Array();
        this.sortOrder = 0;
        this.sortField = "";
        this.sortKey = "";
    }

    ngOnInit(): void {
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];

        this.primengConfig.ripple = true;

        // call FlowerService to get All flowers here
        this.flowerService.getFlowers().subscribe({
            next: (response) => {
                this.flowers = response;
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        });
    }

    onSortChange(event: any) {
        let value = event.value;
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }


    // needs this for the search box idk
    applyFilterGlobal($event: any, dv: any) {
        dv.filterGlobal(($event.target as HTMLInputElement).value);
    }

}
