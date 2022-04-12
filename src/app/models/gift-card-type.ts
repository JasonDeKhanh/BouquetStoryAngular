export class GiftCardType {

    giftCardTypeId: number | undefined;
    name: string | undefined;
    imgAddress: string | undefined;
    sizeDimensions: string | undefined;
    description: string | undefined;
    quantityOnHand: number | undefined;
    reorderQuantity: number | undefined;
    unitPrice: number | undefined;
    isOnDisplay: boolean | undefined;

    constructor(giftCardTypeId?: number, name?: string, imgAdress?: string, sizeDimensions?: string, description?: string, quantityOnHand?: number, reorderQuantity?: number, unitPrice?: number, isOnDisplay?: boolean) {
        this.giftCardTypeId = giftCardTypeId;
        this.name = name;
        this.imgAddress = imgAdress;
        this.sizeDimensions = sizeDimensions;
        this.description = description;
        this.quantityOnHand = quantityOnHand;
        this.reorderQuantity = reorderQuantity;
        this.unitPrice = unitPrice;
        this.isOnDisplay = isOnDisplay;

    }
}
