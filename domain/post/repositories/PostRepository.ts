import { Post } from "../entities/post";
import { getPostData, getSortedPostsData } from "../../../data/PostLoader";
import { ParseToEntity } from "./model/PostData";

export interface PostRepository {
  get(id: string): Promise<Post>;
  getList(): Promise<Post[]>;
}

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
