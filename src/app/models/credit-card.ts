export class CreditCard {

    creditCardId: number | undefined;
    ccNum: string | undefined;
    ccHolderName: string | undefined;
    ccExpiryMonth: string | undefined;
    ccExpiryYear: string | undefined;

    constructor(creditCardId?: number, ccNum?: string, ccHolderName?: string, ccExpiryMonth?: string, ccExpiryYear?: string) {
        this.creditCardId = creditCardId;
        this.ccNum = ccNum;
        this.ccHolderName = ccHolderName;
        this.ccExpiryMonth = ccExpiryMonth;
        this.ccExpiryYear = ccExpiryYear;

    }
}
