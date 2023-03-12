import { Post } from "../entities/post";
import {
  PostRepository,
  PostRepositoryImpl,
} from "../repositories/PostRepository";

export class PostUseCase {
  repository: PostRepository;

  constructor(repository: PostRepository = new PostRepositoryImpl()) {
    this.repository = repository;
  }

  get(id: string): Promise<Post> {
    return this.repository.get(id);
  }

  getList(): Promise<Post[]> {
    return this.repository.getList();
  }
}
