import { TagProps } from "../../domain/entity/tag.entity";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type UpdateTaskInputDto = {
    id: string;
    title: string;
    description: string;
    tag: TagProps;
};

export type UpdateTaskOutputDto = void;
    
export class UpdateTaskUseCase implements UseCase<UpdateTaskInputDto, UpdateTaskOutputDto> {
    
    private constructor(private readonly taskGateway: TaskGateway) {}

    public static create(taskGateway: TaskGateway) {
        return new UpdateTaskUseCase(taskGateway)
    }

    public async execute({id, title, description, tag}: UpdateTaskInputDto): Promise<UpdateTaskOutputDto> {
        const aTask = await this.taskGateway.find(id)

        if (!aTask) {
            throw new Error("Task not found")
        }

        aTask.edit(title, description, tag)

        await this.taskGateway.update(aTask)

        return
    }
    
}
