import { Tag } from "../../domain/entity/tag.entity"
import { TagGateway } from "../../domain/gateway/tag.gateway"
import { UseCase } from "../usecase"

export type FindTagInputDto = {
    id: string
}

export type FindTagOutputDto = {
    id: string
    name: string
}


export class FindTagUseCase implements UseCase<FindTagInputDto, FindTagOutputDto> {

    private constructor(private readonly tagGateway: TagGateway) {}

    public static create (tagGateway: TagGateway) {
        return new FindTagUseCase(tagGateway)
    }

    public async execute({id}: FindTagInputDto): Promise<FindTagOutputDto> {
        const aTag = await this.tagGateway.find(id)

        if (!aTag) {
            throw new Error('Tag not found')
        }
        
        const output = this.presentOutPut(aTag)

        return output
    }

    private presentOutPut(tag: Tag): FindTagOutputDto {
        const output: FindTagOutputDto = {
            id: tag.id,
            name: tag.name
        }

        return output
    }
}