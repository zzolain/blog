import { PostRepository } from "../domain/post/repositories/PostRepository";
import { PostFirebaseRepositoryImpl } from "../data/repositories/PostRepositoryImpl";
import { PostUsecase } from "../domain/post/usecases/postUsecase";
import { Post } from "../domain/post/entities/post";

export class PostInteractor {
  usecase: PostUsecase;

  constructor(repository: PostRepository = new PostFirebaseRepositoryImpl()) {
    this.usecase = new PostUsecase(repository);
  }

  async get(id: string): Promise<Post> {
    return this.usecase.get(id);
  }

  async getList(): Promise<Post[]> {
    return this.usecase.getList();
  }
}
