import { TagProps } from "./tag.entity";

export type TaskProps = {
    id: string;
    title: string;
    description: string;
    status: string;
    tag?: TagProps
    createAt: Date;
    updateAt: Date;
};

export class Task {
    private constructor(private prop: TaskProps) {}

    public static create(title: string, description: string, tagId: TagProps) {
        return new Task({
            id: crypto.randomUUID().toString(),
            title,
            description,
            status: 'open',
            tag: tagId,
            createAt: new Date(),
            updateAt: new Date(),
        });
    }

    static with(props: TaskProps) {
        return new Task(props);
    }

    public get id() {
        return this.prop.id;
    }

    public get title() {
        return this.prop.title;
    }

    public get description() {
        return this.prop.description;
    }

    public get status() {
        return this.prop.status;
    }

    public get tag() {
        return this.prop.tag;
    }

    public get createAt() {
        return this.prop.createAt;
    }

    public get updateAt() {
        return this.prop.updateAt;
    }

    edit(title: string, description: string, tag: TagProps) {
        this.prop.title = title;
        this.prop.description = description;
        this.prop.tag = tag;
        this.prop.updateAt = new Date();
    }

    done() {
        this.prop.status = 'done';
        this.prop.updateAt = new Date();
    }

    inProgress() {
        this.prop.status = 'in-progress';
        this.prop.updateAt = new Date();
    }

    toDo() {
        this.prop.status = 'to-do';
        this.prop.updateAt = new Date();
    }

    reopen() {
        this.prop.status = 'open';
        this.prop.updateAt = new Date();
    }

}
