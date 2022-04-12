import { Customer } from "./customer";

export class UnregisteredGuest extends Customer {

    constructor(customerId?: number, firstName?: string, lastName?: string, username?: string, password?: string) {
        super(customerId, firstName, lastName, username)
    }
}
