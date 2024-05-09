import { TagProps } from "../../domain/entity/tag.entity";
import { Task } from "../../domain/entity/task.entity";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type ListTaskInputDto = void

export type ListTaskOutputDto = {
    tasks: {
        id: string;
        title: string;
        description: string;
        status: string;
        tag: TagProps;
        createAt: Date;
        updateAt: Date;
    }[]
}

export class ListTaskUseCase implements UseCase<ListTaskInputDto, ListTaskOutputDto> {

    private constructor(private readonly taskGateway: TaskGateway) {}

    public static create(taskGateway: TaskGateway) {
        return new ListTaskUseCase(taskGateway);
    }

    public async execute(): Promise<ListTaskOutputDto> {
        const tasks = await this.taskGateway.list()

        const output = this.presentOutPut(tasks)

        return output
    }

    private presentOutPut(tasks: Task[]): ListTaskOutputDto {
        const output: ListTaskOutputDto = {
            tasks: tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                tag: task.tag,
                createAt: task.createAt,
                updateAt: task.updateAt
            }))
        }

        return output
    }
}   