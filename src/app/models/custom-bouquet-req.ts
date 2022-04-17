import { CustomBouquet } from "./custom-bouquet";
import { Flower } from "./flower";
import { Container } from "./container";
import { Decoration } from "./decoration";

export class CustomBouquetReq {

    customBouquet: CustomBouquet | undefined;
    container: Container | undefined;
    flowers: Flower[] | undefined;
    flowerQuantities: number[] | undefined;
    decorations: Decoration[] | undefined;
    decorationQuantities: number[] | undefined;

    constructor(customBouquet?: CustomBouquet,
        container?: Container,
        flowers?: Flower[],
        flowerQuantities?: number[],
        decorations?: Decoration[],
        decorationQuantities?: number[]) {

        this.customBouquet = customBouquet;
        this.container = container;
        this.flowers = flowers;
        this.flowerQuantities = flowerQuantities;
        this.decorations = decorations;
        this.decorationQuantities = decorationQuantities;

    }

}
