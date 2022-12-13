import { PostRepository } from "../domain/post/repositories/PostRepository";
import { PostUsecase } from "../domain/post/usecases/postUsecase";
import { Post } from "../domain/post/entities/post";
import { PostRepositoryImpl } from "../data/repositories/PostRepositoryImpl";

export class PostInteractor {
  usecase: PostUsecase;

  constructor(repository: PostRepository = new PostRepositoryImpl()) {
    this.usecase = new PostUsecase(repository);
  }

  async get(id: string): Promise<Post> {
    return this.usecase.get(id);
  }

  async getList(): Promise<Post[]> {
    return this.usecase.getList();
  }
}
