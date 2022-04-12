import { SaleTransaction } from "./sale-transaction";

export class Customer {

    customerId: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;

    saleTransactions: SaleTransaction[] | undefined;

    constructor(customerId?: number, firstName?: string, lastName?: string, username?: string) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

}
