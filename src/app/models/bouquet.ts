import { Decoration } from "./decoration";
import { Product } from "./product";
import { Flower } from "./flower";
import { Container } from "./container";

export abstract class Bouquet extends Product {

    creatorName: string | undefined;
    flowerQuantities: Map<Flower, number> | undefined;
    decorationQuantities: Map<Decoration, number> | undefined;

    container: Container | undefined;

    decorations: { decoration: Decoration } | undefined;
    flowers: { flower: Flower } | undefined;

    constructor(itemId?: number, creatorName?: string) {
        super(itemId);

        this.creatorName = creatorName;

        this.flowerQuantities = new Map<Flower, number>();
        this.decorationQuantities = new Map<Decoration, number>();
    }

}
