import { Task } from "../entity/task.entity";

export interface TaskGateway {
    save(task: Task): Promise<void>
    list(): Promise<Task[]>
    find(id: string): Promise<Task | null>
    delete(id: string): Promise<void>
    update(task: Task): Promise<void>
}