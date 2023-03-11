export class Post {
  id: string;
  title: string;
  createdAt: Date;
  subTitle: string;
  body: string;
  tags: string[];

  constructor(
    id: string,
    title: string,
    createdAt: Date,
    subTitle: string,
    body: string,
    tags: string[]
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.subTitle = subTitle;
    this.body = body;
    this.tags = tags;
  }
}
