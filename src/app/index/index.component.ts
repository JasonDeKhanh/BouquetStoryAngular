import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {CarouselModule} from 'primeng/carousel';

import { SessionService } from '../services/session.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { MessageService } from 'primeng/api';//<--------------


@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	items: Item[];
	responsiveOptions: any;

	constructor(private itemService: ItemService) { this.items = new Array() }

	ngOnInit(): void {
		this.itemService.getItems().subscribe({
            next: (response) => {
                this.items = response;
                // this.productQuantityMapInitializer();
            },
            error: (error) => {
                console.log('********** indexComponent.ts: ' + error);
            }
        });
		this.responsiveOptions = [
			{
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
		]
	}

	
}
