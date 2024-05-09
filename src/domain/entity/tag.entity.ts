export type TagProps = {
    id: string;
    name: string;
}

export class Tag {
    private constructor (private prop: TagProps) {}

    public static create (name: string) {
        return new Tag({
            id: crypto.randomUUID().toString(),
            name,
        });
    }

    static with(props: TagProps) {
        return new Tag(props);
    }

    public get id () {
        return this.prop.id;
    }

    public get name () {
        return this.prop.name;
    }

    edit (name: string) {
        this.prop.name = name;
    }
}