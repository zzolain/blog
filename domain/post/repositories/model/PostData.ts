import { Post } from "../../entities/post";

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
    data.body,
    Array.from(new Set(data.tags.split(",").map((tag) => tag.trim())))
  );
}
