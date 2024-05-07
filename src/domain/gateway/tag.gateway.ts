import { TagProps } from "../entity/tag.entity";

export interface TagGateway {
    save(tag: TagProps): Promise<void>
    list(): Promise<TagProps[]>
    find(id: string): Promise<TagProps | null>
    delete(id: string): Promise<void>
    update(tag: TagProps): Promise<void>
}