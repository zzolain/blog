import { Post } from "../entities/post";
import { PostRepository } from "../repositories/PostRepository";

export class PostUsecase {
  repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  get(id: string): Promise<Post> {
    return this.repository.get(id);
  }

  getList(): Promise<Post[]> {
    return this.repository.getList();
  }
}
