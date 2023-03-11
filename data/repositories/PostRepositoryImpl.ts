import { PostRepository } from "../../domain/post/repositories/PostRepository";
import { Post } from "../../domain/post/entities/post";
import { ParseToEntity } from "../../domain/post/repositories/model/PostData";
import { getPostData, getSortedPostsData } from "../PostLoader";

export class PostRepositoryImpl implements PostRepository {
  async get(id: string): Promise<Post> {
    const response: any = await getPostData(id);

    if (!response) throw new Error("해당 데이터가 없습니다.");

    const data = {
      id: response.id,
      title: response.title,
      createdAt: new Date(response.date),
      body: response.body,
      subTitle: response.subTitle,
      tags: response.tags,
    };
    return ParseToEntity(data);
  }

  async getList(): Promise<Post[]> {
    const response = getSortedPostsData();
    const data = response.map((post: any) => ({
      id: post.id,
      title: post.title,
      createdAt: new Date(post.date),
      body: post.body,
      subTitle: post.subTitle,
      tags: post.tags,
    }));
    return data.map((post) => ParseToEntity(post));
  }
}
