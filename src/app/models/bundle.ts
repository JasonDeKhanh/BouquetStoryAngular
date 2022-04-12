import { Item } from "./item";
import { Promotion } from "./promotion";
import { Product } from "./product";

export class Bundle extends Item {

    bundleName: string | undefined;
    imgAddress: string | undefined;
    isOnDisplay: boolean | undefined;
    productQuantities: Map<Product, number> | undefined;

    promotion: Promotion | undefined;
    products: Product[] | undefined;

    constructor(itemId?: number, bundleName?: string) {
        super(itemId);

        this.bundleName = bundleName;
        this.productQuantities = new Map<Product, number>();

    }

}
