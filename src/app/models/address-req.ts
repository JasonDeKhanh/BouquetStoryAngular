import { Address } from "./address";

export class AddressReq {
    address: Address | undefined;
    username: String | undefined;


    constructor(address?: Address, username?: string)
    {	
        this.address = address;
        this.username = username;
    }
}