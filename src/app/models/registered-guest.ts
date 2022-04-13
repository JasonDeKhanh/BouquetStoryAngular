import { Address } from "./address";
import { Customer } from "./customer";

export class RegisteredGuest extends Customer {

    password: string | undefined;

    addresses: Address[] | undefined;

    constructor(customerId?: number, firstName?: string, lastName?: string, email?: string, password?: string) {
        super(customerId, firstName, lastName, email)
        this.password = password;
    }

}
