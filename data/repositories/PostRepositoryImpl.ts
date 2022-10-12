import { PostRepository } from "../../domain/post/repositories/PostRepository";
import { Post } from "../../domain/post/entities/post";
import { PrismaClient } from "@prisma/client";
import { ParseToEntity } from "../model/PostData";

const prisma = new PrismaClient();

export class PostRepositoryImpl implements PostRepository {
  async get(id: number): Promise<Post> {
    const data = await prisma.postData.findUnique({
      where: {
        id: id as number,
      },
    });
    if (!data) throw new Error("해당 데이터가 없습니다.");
    return ParseToEntity(data);
  }

  async getList(): Promise<Post[]> {
    const data = await prisma.postData.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data.map((post) => ParseToEntity(post));
  }
}
