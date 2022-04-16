import { Item } from "./item";
import { Promotion } from "./promotion";
import { Product } from "./product";


export class Bundle extends Item {

    name: string | undefined;
    imgAddress: string | undefined;
    isOnDisplay: boolean | undefined;
    productQuantities: Map<Product, number> | undefined;
    // productQuantities: { [product: string]: number };
    unitPrice: number | undefined;
    totalPrice: number | undefined;

    promotion: Promotion | undefined;
    products: Product[] | undefined;

    constructor(itemId?: number, name?: string, unitPrice?: number, totalPrice?: number) {
        super(itemId);

        this.name = name;
        this.productQuantities = new Map<Product, number>();
        this.unitPrice = unitPrice;
        this.totalPrice = 100;
        // for (var parameter in this.parameters) {
        //     this.addProductQuantity(parameter);
        // }

        // this.productQuantities = {};

    }

}
