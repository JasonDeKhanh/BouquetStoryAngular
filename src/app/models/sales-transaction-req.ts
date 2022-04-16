import { SaleTransaction } from "./sale-transaction";
import { SaleTransactionLineItem } from "./sale-transaction-line-item";

export class SalesTransactionReq {
    
    username: String | undefined;
    saleTransaction: SaleTransaction | undefined;
    saleTransactionLineItems: SaleTransactionLineItem[]| undefined;
    
    constructor(username?: string, saleTransaction?: SaleTransaction, saleTransactionLineItems?:SaleTransactionLineItem[])
    {	
        this.username = username;
        this.saleTransaction = saleTransaction;
        this.saleTransactionLineItems = saleTransactionLineItems;
    }
}
