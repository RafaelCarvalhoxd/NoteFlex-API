import { TagProps } from "../../domain/entity/tag.entity";
import { Task } from "../../domain/entity/task.entity";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type FindTaskInputDto = {
    id: string;
}

export type FindTaskOutputDto = {
    id: string;
    title: string;
    description: string;
    status: string;
    tag: TagProps
    createAt: Date;
    updateAt: Date;
}

export class FindTaskUseCase  implements UseCase<FindTaskInputDto, FindTaskOutputDto>{

    private constructor(private readonly taskGateway: TaskGateway) {}

    public static create(taskGateway: TaskGateway){
        return new FindTaskUseCase(taskGateway);
    }

    public async execute({id}: FindTaskInputDto): Promise<FindTaskOutputDto> {
        const aTask = await this.taskGateway.find(id);

        if (!aTask) {
            throw new Error('Task not found');
        }

        const output = this.presentOutput(aTask);

        return output;
    }

    private presentOutput(task: Task): FindTaskOutputDto {
        const output: FindTaskOutputDto = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            tag: task.tag,
            createAt: task.createAt,
            updateAt: task.updateAt,
        };

        return output;
    }
}