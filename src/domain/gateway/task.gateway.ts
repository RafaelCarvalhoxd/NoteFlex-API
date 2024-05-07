import { TaskProps } from "../entity/task.entity";

export interface taskGateway {
    save(task: TaskProps): Promise<void>
    list(): Promise<TaskProps[]>
    find(id: string): Promise<TaskProps | null>
    delete(id: string): Promise<void>
    update(task: TaskProps): Promise<void>
}