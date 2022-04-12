import { Flower } from "./flower";

export class FlowerType {

    flowerTypeId: number | undefined;
    name: string | undefined;
    description: string | undefined;

    flowers: Flower[] | undefined;

    constructor(flowerTypeId?: number, name?: string, description?: string) {
        this.flowerTypeId = flowerTypeId;
        this.name = name;
        this.description = description;
    }
}
