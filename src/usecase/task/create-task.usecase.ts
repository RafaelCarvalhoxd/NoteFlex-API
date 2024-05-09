import { TagProps } from "../../domain/entity/tag.entity";
import { Task } from "../../domain/entity/task.entity";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type CreateTaskInputDto = {
    title: string;
    description: string;
    tag: TagProps
}

export type CreateTaskOutputDto = {
    id: string;
};

export class CreateTaskUseCase implements UseCase<CreateTaskInputDto, CreateTaskOutputDto>{

    private constructor(private readonly taskGateway: TaskGateway) {}

    public static create(taskGateway: TaskGateway): CreateTaskUseCase {
        return new CreateTaskUseCase(taskGateway);
    }

    public async execute({title, description, tag}: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
        const aTask = Task.create(title, description, tag);

        await this.taskGateway.save(aTask);

        const output = this.presentOutput(aTask);

        return output;
    }

    private presentOutput(task: Task): CreateTaskOutputDto {
        const output: CreateTaskOutputDto = {
            id: task.id
        };

        return output;
    }

}