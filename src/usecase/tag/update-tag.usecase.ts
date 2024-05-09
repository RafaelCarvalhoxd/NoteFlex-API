import { TagGateway } from "../../domain/gateway/tag.gateway"
import { UseCase } from "../usecase"

export type UpdateTagInputDto = {
    id: string
    name: string
}

export type UpdateTagOutputDto = void

export class UpdateTagUseCase implements UseCase<UpdateTagInputDto, UpdateTagOutputDto> {
    
    private constructor(private readonly tagGateway: TagGateway) {}

    public static create(tagGateway: TagGateway) {
        return new UpdateTagUseCase(tagGateway)
    }

    public async execute({id, name}: UpdateTagInputDto): Promise<UpdateTagOutputDto> {
        const aTag = await this.tagGateway.find(id)

        if (!aTag) {
            throw new Error("Tag not found")
        }

        aTag.edit(name)

        await this.tagGateway.update(aTag)

        return
    }
    
}