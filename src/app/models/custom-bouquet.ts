import { toArray } from "rxjs";
import { Bouquet } from "./bouquet";

export class CustomBouquet extends Bouquet {

    totalPriceAmount: number | undefined;
    name: string | undefined;

    constructor(itemId?: number, totalPriceAmount?: number) {
        super(1);

        this.totalPriceAmount = totalPriceAmount;
        this.name = "Custom Bouquet";
    }

}
