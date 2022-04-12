import { GiftCardType } from "./gift-card-type";
import { Product } from "./product";

export class GiftCard extends Product {

    message: string | undefined;
    photoImgAddress: string | undefined;

    giftCardType: GiftCardType | undefined;

    constructor(itemId?: number, message?: string, photoImgAddress?: string) {
        super(itemId)

        this.message = message;
        this.photoImgAddress = photoImgAddress;
    }
}
