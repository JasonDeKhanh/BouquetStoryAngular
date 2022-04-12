export class ContainerType {

    containerTypeId: number | undefined;
    name: string | undefined;
    dimensions: string | undefined;

    constructor(containerId?: number, name?: string, dimensions?: string) {

        this.containerTypeId = containerId;
        this.name = name;
        this.dimensions = dimensions;

    }

}
