import { Tag } from "../../domain/entity/tag.entity"
import { TagGateway } from "../../domain/gateway/tag.gateway"
import { UseCase } from "../usecase"

export type ListTagInputDto = void

export type ListTagOutputDto = {
    tags: {
        id: string
        name: string
    }[]
}

export class ListTagUseCase implements UseCase<ListTagInputDto, ListTagOutputDto> {

    private constructor(private readonly tagGateway: TagGateway) {}

    public static create(tagGateway: TagGateway) {
        return new ListTagUseCase(tagGateway)
    }

    public async execute(): Promise<ListTagOutputDto> {
        const aTags = await this.tagGateway.list()

        const output = this.presentOutPut(aTags)

        return output
    }

    private presentOutPut(tags: Tag[]): ListTagOutputDto {
        const output: ListTagOutputDto = {
            tags: tags.map(tag => ({
                id: tag.id,
                name: tag.name
            }))
        }

        return output
    }
}