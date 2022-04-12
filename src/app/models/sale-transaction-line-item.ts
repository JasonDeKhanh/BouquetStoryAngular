import { Item } from "./item";

export class SaleTransactionLineItem {

    saleTransactionLineItemId: number | undefined;
    serialNumber: number | undefined;
    quantity: number | undefined;
    unitPrice: number | undefined;

    item: Item | undefined;

    constructor(saleTransactionLineItemId?: number, serialNumber?: number, quantity?: number, unitPrice?: number) {
        this.saleTransactionLineItemId = saleTransactionLineItemId;
        this.serialNumber = serialNumber;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

}
