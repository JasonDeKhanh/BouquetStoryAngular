import { Item } from "./item";

export class SaleTransactionLineItem {

    serialNumber: number | undefined;
    quantity: number | undefined;
    unitPrice: number | undefined;

    item: Item | undefined;

    constructor(serialNumber?: number, quantity?: number, unitPrice?: number) {
        this.serialNumber = serialNumber;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

}
