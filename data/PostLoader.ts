import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isNotJunk } from "junk";

const directory = path.join(process.cwd(), "public/assets/posts");

export function getSortedPostsData() {
  const folderNames = fs.readdirSync(directory).filter(isNotJunk);
  const allPostsData = folderNames.map((folderName) => {
    const id = folderName;
    const fullPath = path.join(directory, `${folderName}/index.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
      date: matterResult.data.date,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(directory, `${id}/index.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    body: matterResult.content,
  };
}
