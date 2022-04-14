import { Component, OnInit } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { FlowerService } from '../services/flower.service';
import { Flower } from '../models/flower';
import { FlowerColorEnum } from '../models/flower-color-enum';

import { FlowerTypeService } from '../services/flower-type.service';
import { FlowerType } from '../models/flower-type';

@Component({
    selector: 'app-flower-gallery',
    templateUrl: './flower-gallery.component.html',
    styleUrls: ['./flower-gallery.component.css']
})

export class FlowerGalleryComponent implements OnInit {


    allFlowers: Flower[];
    filteredFlowers: Flower[];

    allFlowerTypes: FlowerType[];
    allFlowerTypeNames: string[];

    selectedFlowerType: FlowerType;
    selectedFlowerColor: FlowerColorEnum;

    listColor: SelectItem[];
    listType: SelectItem[];

    constructor(private primengConfig: PrimeNGConfig, private flowerService: FlowerService,
        private flowerTypeService: FlowerTypeService) {
        this.allFlowers = new Array();
        this.filteredFlowers = new Array();

        this.allFlowerTypes = new Array();
        this.allFlowerTypeNames = new Array();

        this.selectedFlowerType = new FlowerType();
        this.selectedFlowerColor = FlowerColorEnum.ALLCOLORS;

        this.onChangeFlowerFilter;

        this.listColor = new Array();

        this.listType = new Array();

    }

    ngOnInit(): void {

        this.listColor = [
            { label: 'All Colors', value: 'ALLCOLORS' },
            { label: 'Red', value: "RED" },
            { label: 'Orange', value: 'ORANGE' },
            { label: 'Yellow', value: 'YELLOW' },
            { label: 'Green', value: 'GREEN' },
            { label: 'Blue', value: 'BLUE' },
            { label: 'Indigo', value: 'INDIGO' },
            { label: 'Purple', value: 'PURPLE' },
            { label: 'Pink', value: 'PINK' },
            { label: 'White', value: 'WHITE' },
            { label: 'Brown', value: 'BROWN' },
            { label: 'Black', value: 'BLACK' },
            { label: 'Multicolored', value: 'MULTICOLORED' },
        ];

        this.primengConfig.ripple = true;

        // call FlowerService to get All flowers here
        this.flowerService.getFlowers().subscribe({
            next: (response) => {
                this.allFlowers = response;
                this.filteredFlowers = response.slice();
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        });

        // call FlowerTypeService to get All flower types
        this.flowerTypeService.getFlowerTypes().subscribe({
            next: (response) => {
                this.allFlowerTypes = response;
                this.listType.push(
                    { label: "All Types", value: null }
                )
                for (var flowerType of this.allFlowerTypes) {
                    this.listType.push(
                        { label: flowerType.name, value: flowerType }
                    )
                    console.log("cur flowerType: " + flowerType.name);
                }
            },
            error: (error) => {
                console.log('********** ViewAllRecordsComponent.ts: ' + error);
            }
        })

        // for (var flowerType of this.allFlowerTypes) {
        //     this.allFlowerTypeNames.push(flowerType.name?.toString());
        // }

    }


    onChangeFlowerFilter(event: any) {
        // console.log("selectedFlowerColor: " + FlowerColorEnum[this.selectedFlowerColor])
        this.changeFlowerColorFilter();
        this.changeFlowerTypeFilter();
    }


    changeFlowerColorFilter() {

        // console.log("this.allFlowers[3].flowerColor:" + this.allFlowers[3].flowerColor + ";")
        // console.log("this.allFlowers[3].toString(): " + typeof this.allFlowers[3].toString())
        // console.log("what true false equals: " + (this.allFlowers[3].flowerColor === "BLUE"));
        // console.log("what true false equals: " + (4 === 4));

        if (this.selectedFlowerColor === FlowerColorEnum.ALLCOLORS) {
            // reset, apply no color filter
            this.filteredFlowers = this.allFlowers.slice();
            console.log("all flowers in here:" + this.allFlowers.toString())
        }
        else {
            // this.filteredFlowers = this.allFlowers.filter(
            //     flower => {
            //         flower.flowerColor == FlowerColorEnum.BLUE;
            //         // flower.flowerColor?.toString() === 'BLUE';
            //         // console.log("what true false equals: " + (flower.flowerColor == FlowerColorEnum.BLUE));
            //         // console.log("in here, this.flowerColor: " + flower.flowerColor?.toString());
            //         // console.log("in here, this.selectedFlowerColor: " + FlowerColorEnum[this.selectedFlowerColor].toString())
            //     }
            // )
            this.filteredFlowers = new Array();
            for (var flower of this.allFlowers) {
                if (flower.flowerColor == this.selectedFlowerColor) {
                    this.filteredFlowers.push(flower);
                }
            }
            console.log("filteredFlowers now: " + this.filteredFlowers.toString())
        }
    }

    changeFlowerTypeFilter() {
        if (this.selectedFlowerType === null) {
            // do nothing
        }
        else {
            // this.filteredFlowers = new Array();
            var tempFlowerTypes = new Array();
            for (var flower of this.filteredFlowers) {
                if (flower.flowerType?.name === this.selectedFlowerType.name) {
                    tempFlowerTypes.push(flower);
                }
            }
            this.filteredFlowers = tempFlowerTypes;
            console.log("filteredFlowers now: " + this.filteredFlowers.toString())
        }
    }

    convertToTitleCase(inStrnig: string): string {
        return inStrnig.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    // onSortChange(event: any) {
    //     let value = event.value;

    //     if (value.indexOf('!') === 0) {
    //         this.sortOrder = -1;
    //         this.sortField = value.substring(1, value.length);
    //     }
    //     else {
    //         this.sortOrder = 1;
    //         this.sortField = value;
    //     }
    // }


    // // needs this for the search box idk
    // applyFilterGlobal($event: any, dv: any) {
    //     dv.filterGlobal(($event.target as HTMLInputElement).value);
    // }

}
