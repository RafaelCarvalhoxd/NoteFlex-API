import { TagGateway } from "../../domain/gateway/tag.gateway"
import { UseCase } from "../usecase"

export type DeleteTagInputDto = {
    id: string
}

export type DeleteTagOutputDto = void

export class DeleteTagUseCase implements UseCase<DeleteTagInputDto, DeleteTagOutputDto> {
    
    private constructor(private readonly tagGateway: TagGateway) {}

    public static create(tagGateway: TagGateway) {
        return new DeleteTagUseCase(tagGateway)
    }

    public async execute({id}: DeleteTagInputDto): Promise<DeleteTagOutputDto> {
        const aTag = await this.tagGateway.find(id)

        if (!aTag) {
            throw new Error("Tag not found")
        }

        await this.tagGateway.delete(id)

        return
    }
    
}