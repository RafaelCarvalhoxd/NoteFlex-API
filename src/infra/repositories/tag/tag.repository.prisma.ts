import { PrismaClient } from "@prisma/client";
import { TagGateway } from "../../../domain/gateway/tag.gateway";
import { Tag } from "../../../domain/entity/tag.entity";

export class TagRepositoryPrisma implements TagGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new TagRepositoryPrisma(prismaClient);
    }

    public async save(tag: Tag): Promise<void> {
        const data = {
            id: tag.id,
            name: tag.name
        };

        await this.prismaClient.tag.create({
            data
        });
    }

    public async list(): Promise<Tag[]> {
        const tags = await this.prismaClient.tag.findMany();

        const tagList = tags.map(t => {
            const tag = Tag.with({
                id: t.id,
                name: t.name
                });

                return tag
            })

        return tagList;
    };

    public async find(id: string): Promise<Tag | null> {
        const tag = await this.prismaClient.tag.findUnique({
            where: {
                id
            }
        });

        if (!tag) {
            return null;
        }

       const data = {
            id: tag.id,
            name: tag.name
        };

        return Tag.with(data);
    }

    public async delete(id: string): Promise<void> {
        const tag = await this.prismaClient.tag.delete({
            where: {
                id
            }
        });

        return;
    }

    public async update(tag: Tag): Promise<void> {
        const data = {
            id: tag.id,
            name: tag.name
        };

        await this.prismaClient.tag.update({
            where: {
                id: tag.id
            },
            data
        });

        return;
        
    }
}


