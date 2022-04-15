import { CreditCard } from "./credit-card";

export class CreditCardReq {
    creditCard: CreditCard | undefined;
    username: String | undefined;


    constructor(creditCard?: CreditCard, username?: string)
    {	
        this.creditCard = creditCard;
        this.username = username;
    }
}
