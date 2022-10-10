export class Post {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  body: string;
  tags: string[];

  constructor(
    id: number,
    title: string,
    createdAt: string,
    description: string,
    body: string,
    tags: string[]
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.description = description;
    this.body = body;
    this.tags = tags;
  }
}
