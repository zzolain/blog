import { PostRepository } from "../../domain/post/repositories/PostRepository";
import { Post } from "../../domain/post/entities/post";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$on("query", (e: any) => {
  console.log("??", e);
});

export class PostRepositoryImpl implements PostRepository {
  async get(id: number): Promise<Post> {
    return await prisma.posts.findUnique({
      where: {
        id: id as number,
      },
    });
  }

  async getList(): Promise<Post[]> {
    return await prisma.posts.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }
}
