import fs from "fs";
import path from "path";

const postsFilePath = path.resolve(__dirname, "../../data/posts.json");

export const getPosts = (): any[] => {
  if (!fs.existsSync(postsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(postsFilePath, "utf8");
  return JSON.parse(data);
};

export const savePosts = (posts: any[]) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), "utf8");
};
