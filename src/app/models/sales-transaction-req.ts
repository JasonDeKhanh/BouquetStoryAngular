import { SaleTransaction } from "./sale-transaction";
import { SaleTransactionLineItem } from "./sale-transaction-line-item";
import { Item } from "./item";

export class SalesTransactionReq {
    
    username: String | undefined;
    firstName: String | undefined;
    lastName: String | undefined;
    saleTransaction: SaleTransaction | undefined;
    saleTransactionLineItems: SaleTransactionLineItem[]| undefined;
    items: number[]|undefined;
    
    constructor(username?: string, firstName?: string, lastName?:string, saleTransaction?: SaleTransaction, saleTransactionLineItems?:SaleTransactionLineItem[],  items?: number[])
    {	
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.saleTransaction = saleTransaction;
        this.saleTransactionLineItems = saleTransactionLineItems;
        this.items = items;
    }
}
