import axios from "axios";
import type { Post, PostsResponse } from "../types/post";

export async function getProducts(): Promise<Post[]> {
  const { data } = await axios.get<PostsResponse>(
    `https://dummyjson.com/posts`,
  );

  return data.posts;
}
