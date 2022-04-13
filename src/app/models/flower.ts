import { FlowerColorEnum } from "./flower-color-enum";

export class Flower {

    flowerId: number | undefined;
    name: string | undefined;
    imgAddress: string | undefined;
    flowerColor: FlowerColorEnum | undefined;
    description: string | undefined;
    quantityOnHand: number | undefined;
    reorderQuantity: number | undefined;
    unitPrice: number | undefined;
    isOnDisplay: boolean | undefined;

    constructor(flowerId?: number, name?: string, imgAdress?: string, flowerColor?: FlowerColorEnum, description?: string, quantityOnHand?: number, reorderQuantity?: number, unitPrice?: number, isOnDisplay?: boolean) {
        this.flowerId = flowerId;
        this.name = name;
        this.imgAddress = imgAdress;
        this.flowerColor = flowerColor;
        this.description = description;
        this.quantityOnHand = quantityOnHand;
        this.reorderQuantity = reorderQuantity;
        this.unitPrice = unitPrice;
        this.isOnDisplay = isOnDisplay;

    }
}
