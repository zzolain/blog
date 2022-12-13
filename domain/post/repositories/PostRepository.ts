import { Post } from "../entities/post";

export interface PostRepository {
  get(id: string): Promise<Post>;
  getList(): Promise<Post[]>;
}
