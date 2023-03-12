import { Post } from "../../entities/post";
import { marked } from "marked";
import hljs from "highlight.js";

export declare type PostData = {
  id: string;
  title: string;
  createdAt: Date;
  body: string;
  subTitle: string;
  tags: string;
};

export function ParseToEntity(data: PostData): Post {
  return new Post(
    data.id,
    data.title,
    new Date(data.createdAt),
    data.subTitle,
    data.body ? marked(data.body) : "",
    Array.from(new Set(data.tags.split(",").map((tag) => tag.trim())))
  );
}

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
