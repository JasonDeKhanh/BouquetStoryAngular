import { Item } from "./item";

export abstract class Product extends Item {


    constructor(itemId?: number) {
        super(itemId);
    }

}
