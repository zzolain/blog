import { Post } from "../entities/post";
import { PostRepository } from "../repositories/PostRepository";
import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

export class PostUsecase {
  repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  private highlight(code: string) {
    return marked(code);
  }

  async get(id: string): Promise<Post> {
    const post = await this.repository.get(id);
    return {
      ...post,
      body: this.highlight(post.body),
    };
  }

  getList(): Promise<Post[]> {
    return this.repository.getList();
  }
}
