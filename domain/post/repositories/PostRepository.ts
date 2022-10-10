import { Post } from "../entities/post";

export interface PostRepository {
  get(id: number): Promise<Post>;
  getList(): Promise<Post[]>;
}
