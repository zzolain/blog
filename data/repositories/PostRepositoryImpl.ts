import { PostRepository } from "../../domain/post/repositories/PostRepository";
import { Post } from "../../domain/post/entities/post";
import { ParseToEntity } from "../model/PostData";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_KEY ?? "" });
const databaseId = process.env.NOTION_DATABASE_ID ?? "";
const n2m = new NotionToMarkdown({ notionClient: notion })

export class PostRepositoryImpl implements PostRepository {
  async get(id: string): Promise<Post> {
    const response: any = await notion.pages.retrieve({ page_id: id });
    const blocks = await n2m.pageToMarkdown(id);

    if (!response) throw new Error("해당 데이터가 없습니다.");

    const data = {
      id: response.id,
      title: response.properties['제목'].title.pop()?.plain_text,
      createdAt: new Date(response.created_time),
      body: n2m.toMarkdownString(blocks),
      description: response.properties['부제목'].rich_text.pop()?.plain_text ?? "",
      tags: response.properties['태그'].multi_select.map((tag: any) => tag.name).join(",")
    }
    return ParseToEntity(data);
  }

  async getList(): Promise<Post[]> {
    const response = await notion.databases.query({ 
      database_id: databaseId,
      filter: {
        property: "상태",
        status: {
          equals: "Done"
        }
      }
    });
    const data = response.results.map((post: any) => ({
      id: post.id,
      title: post.properties['제목'].title.pop()?.plain_text,
      createdAt: new Date(post.created_time),
      body: "",
      description: post.properties['부제목'].rich_text.pop()?.plain_text,
      tags: post.properties['태그'].multi_select.map((tag: any) => tag.name).join(",")
    })
  )
    return data.map((post) => ParseToEntity(post));
  }
}
