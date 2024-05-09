import { Tag } from "../entity/tag.entity";

export interface TagGateway {
    save(tag: Tag): Promise<void>
    list(): Promise<Tag[]>
    find(id: string): Promise<Tag | null>
    delete(id: string): Promise<void>
    update(tag: Tag): Promise<void>
}