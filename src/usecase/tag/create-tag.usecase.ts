import { Tag } from "../../domain/entity/tag.entity"
import { TagGateway } from "../../domain/gateway/tag.gateway"
import { UseCase } from "../usecase"

export type CreateTagInputDto = {
    name: string
}

export type CreateTagOutputDto = {
    id: string
}

export class CreateTagUseCase implements UseCase<CreateTagInputDto, CreateTagOutputDto> {
    
    private constructor(private readonly tagGateway: TagGateway) {}

    public static create(tagGateway: TagGateway) {
        return new CreateTagUseCase(tagGateway)
    }

    public async execute({name}: CreateTagInputDto): Promise<CreateTagOutputDto> {
        const aTag = Tag.create(name)

        await this.tagGateway.save(aTag)

        const output = this.presentOutPut(aTag)

        return output
    }

    private presentOutPut(tag: Tag): CreateTagOutputDto {
        const output: CreateTagOutputDto = {
            id: tag.id
        }

        return output
    }
}