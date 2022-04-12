export abstract class Item {

    itemId: number | undefined;

    constructor(itemId?: number) {
        this.itemId = itemId;
    }

}
