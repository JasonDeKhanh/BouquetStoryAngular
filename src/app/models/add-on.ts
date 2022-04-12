import { Product } from "./product";

export class AddOn extends Product {

    name: string | undefined;
    imgAddress: string | undefined;
    description: string | undefined;
    quantityOnHand: number | undefined;
    reorderQuantity: number | undefined;
    unitPrice: number | undefined;
    isOnDisplay: boolean | undefined;


    constructor(itemId?: number, name?: string, imgAdress?: string, description?: string, quantityOnHand?: number, reorderQuantity?: number, unitPrice?: number, isOnDisplay?: boolean) {
        super(itemId);

        this.name = name;
        this.imgAddress = imgAdress;
        this.description = description;
        this.quantityOnHand = quantityOnHand;
        this.reorderQuantity = reorderQuantity;
        this.unitPrice = unitPrice;
        this.isOnDisplay = isOnDisplay;

    }
}
