import { PrismaClient } from "@prisma/client";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { Task } from "../../../domain/entity/task.entity";


export class TaskRepositoryPrisma implements TaskGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new TaskRepositoryPrisma(prismaClient);
    }

    public async save(task: Task): Promise<void> {
        const data = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            tagId: {
                 connect: { id: task.tag?.id } 
            },
            createdAt: task.createAt,
            updatedAt: task.updateAt
        };

        await this.prismaClient.task.create({
            data
        });
    }

    public async list(): Promise<Task[]> {
        const tasks = await this.prismaClient.task.findMany({
            include: {
                tagId: true,
            },
        });
    
        const taskList = tasks.map(t => {
            const task = Task.with({
                id: t.id,
                title: t.title,
                description: t.description,
                status: t.status,
                tag: {
                    id: t.tagId.id,
                    name: t.tagId.name,
                },
                createAt: t.createdAt,
                updateAt: t.updatedAt,
            });
    
            return task;
        });
    
        return taskList;
    };

    public async find(id: string): Promise<Task | null> {
        const task = await this.prismaClient.task.findUnique({
            where: {
                id
            },
            include: {
                tagId: true,
            },
        });

        if (!task) {
            return null;
        }

        const data = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            tag: {
                id: task.tagId.id,
                name: task.tagId.name,
            },
            createAt: task.createdAt,
            updateAt: task.updatedAt,
        };

        return Task.with(data);
    }

    public async delete(id: string): Promise<void> {
        const task = await this.prismaClient.task.delete({
            where: {
                id
            }
        });

        return;
    }

    public async update(task: Task): Promise<void> {
        const data = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            tagId: {
                connect: { id: task.tag?.id }
            },
            createdAt: task.createAt,
            updatedAt: task.updateAt
        };

        await this.prismaClient.task.update({
            where: {
                id: task.id
            },
            data
        });

        return;
    }

}