import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { SessionService } from '../services/session.service';
import { GiftCardTypeService } from '../services/gift-card-type.service';
import { GiftCardType } from '../models/gift-card-type';

@Component({
  selector: 'app-all-gift-card-types',
  templateUrl: './all-gift-card-types.component.html',
  styleUrls: ['./all-gift-card-types.component.css']
})
export class AllGiftCardTypesComponent implements OnInit {

  giftCardTypes: GiftCardType[];

	sortOptions: SelectItem[];

	sortOrder: number;

	sortField: string;

	sortKey: string;

  constructor(private primengConfig: PrimeNGConfig,
    private giftCardTypeService: GiftCardTypeService,
    private sessionService: SessionService) {
      this.giftCardTypes = new Array();
  
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

		// call GiftCardTypeService to get All giftcardtypes here
		this.giftCardTypeService.getGiftCardTypes().subscribe({
			next: (response) => {
				this.giftCardTypes = response;
				// this.productQuantityMapInitializer();
			},
			error: (error) => {
				console.log('********** AllGiftCardTypesComponent.ts: ' + error);
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
