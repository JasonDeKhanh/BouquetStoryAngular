import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { BundleService } from '../services/bundle.service';
import { Bundle } from '../models/bundle';

@Component({
	selector: 'app-all-bundles',
	templateUrl: './all-bundles.component.html',
	styleUrls: ['./all-bundles.component.css']
})
export class AllBundlesComponent implements OnInit {

	bundles: Bundle[];

	sortOptions: SelectItem[];

	sortOrder: number;

	sortField: string;

	sortKey: string;

	constructor(private primengConfig: PrimeNGConfig, private bundleService: BundleService) {
		this.bundles = new Array();

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

        // call BundleService to get All bundles here
        this.bundleService.getBundles().subscribe({
            next: (response) => {
                this.bundles = response;
            },
            error: (error) => {
                console.log('********** AllBundlesComponent.ts: ' + error);
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
