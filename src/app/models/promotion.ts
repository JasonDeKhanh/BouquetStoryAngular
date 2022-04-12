export class Promotion {

    promotionId: number | undefined;
    name: string | undefined;
    discountPercent: number | undefined;

    constructor(promotionId?: number, name?: string, discountPercent?: number) {
        this.promotionId = promotionId;
        this.name = name;
        this.discountPercent = discountPercent;
    }

}
