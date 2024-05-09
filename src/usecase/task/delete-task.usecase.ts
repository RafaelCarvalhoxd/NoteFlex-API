import { TaskGateway } from "../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type DeleteTaskInputDto = {
    id: string;
}

export type DeleteTaskOutputDto = void

export class DeleteTaskUseCase implements UseCase<DeleteTaskInputDto, DeleteTaskOutputDto>{

    private constructor(private readonly taskGateway: TaskGateway) {}

    public static create(taskGateway: TaskGateway){
        return new DeleteTaskUseCase(taskGateway);
    }

    public async execute({id}: DeleteTaskInputDto): Promise<DeleteTaskOutputDto> {
        const aTask = await this.taskGateway.find(id);

        if (!aTask) {
            throw new Error('Task not found');
        }

        await this.taskGateway.delete(id);

        return;
    }

}