import { Item } from "./item";
import { Promotion } from "./promotion";
import { Product } from "./product";

export class Bundle extends Item {

    name: string | undefined;
    imgAddress: string | undefined;
    isOnDisplay: boolean | undefined;
    productQuantities: Map<Product, number> | undefined;

    promotion: Promotion | undefined;
    products: Product[] | undefined;

    constructor(itemId?: number, name?: string) {
        super(itemId);

        this.name = name;
        this.productQuantities = new Map<Product, number>();

    }

}
