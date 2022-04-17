import { ContainerType } from "./container-type";

export class Container {

    containerId: number | undefined;
    color: string | undefined;
    imgAddress: string | undefined;
    description: string | undefined;
    quantityOnHand: number | undefined;
    reorderQuantity: number | undefined;
    unitPrice: number | undefined;
    flowerLimit: number | undefined;
    isOnDisplay: boolean | undefined;

    containerType: ContainerType | undefined;


    constructor(containerId?: number, color?: string, imgAdress?: string, description?: string, quantityOnHand?: number, reorderQuantity?: number, unitPrice?: number, flowerLimit?: number, isOnDisplay?: boolean) {
        this.containerId = containerId;
        this.color = color;
        this.imgAddress = imgAdress;
        this.description = description;
        this.quantityOnHand = quantityOnHand;
        this.reorderQuantity = reorderQuantity;
        this.unitPrice = unitPrice;
        this.flowerLimit = flowerLimit;
        this.isOnDisplay = isOnDisplay;

    }
}
