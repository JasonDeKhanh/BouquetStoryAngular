import { Bouquet } from "./bouquet";
import { OccasionEnum } from "./occasion-enum";

export class PremadeBouquet extends Bouquet {

    name: string | undefined;
    imgAddress: string | undefined;
    description: string | undefined;
    bouquetPrice: number | undefined;
    isOnDisplay: boolean | undefined;
    occasions: OccasionEnum[] | undefined;

    constructor(itemId?: number, name?: string, imgAdress?: string, description?: string, bouquetPrice?: number, isOnDisplay?: boolean) {
        super(itemId);

        this.name = name;
        this.imgAddress = imgAdress;
        this.description = description;
        this.bouquetPrice = bouquetPrice;
        this.isOnDisplay = isOnDisplay;
        // this.occasions = occasions;

    }
}
