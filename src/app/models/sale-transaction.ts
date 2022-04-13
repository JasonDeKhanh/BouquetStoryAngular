import { Customer } from "./customer";
import { SaleTransactionLineItem } from "./sale-transaction-line-item";

export class SaleTransaction {

    saleTransactionId: number | undefined;
    totalLineItem: number | undefined;
    totalQuantity: number | undefined;
    totalAmount: number | undefined;
    transactionDateTime: Date | undefined;
    collectionDatetime: Date | undefined;
    isSelfPickup: boolean | undefined;
    deliveryAddress: string | undefined;
    voidRefund: boolean | undefined;
    isPreorder: boolean | undefined;
    isCompleted: boolean | undefined;

    saleTransactionLineItems: SaleTransactionLineItem[] | undefined;
    customer: Customer | undefined;

    constructor(saleTransactionId?: number, totalLineItem?: number, totalQuantity?: number, totalAmount?: number, transactionDateTime?: Date, collectionDateTime?: Date, isSelfPickup?: boolean, deliveryAddress?: string, voidRefund?: boolean, isPreorder?: boolean, isCompleted?: boolean) {

        this.saleTransactionId = saleTransactionId;
        this.totalLineItem = totalLineItem;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.transactionDateTime = transactionDateTime;
        this.collectionDatetime = collectionDateTime;
        this.isSelfPickup = isSelfPickup;
        this.deliveryAddress = deliveryAddress;
        this.voidRefund = voidRefund;
        this.isPreorder = isPreorder;
        this.isCompleted = isCompleted;

    }

}
