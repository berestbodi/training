import axios from "axios";

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export async function getComments(): Promise<Comment[]> {
  const { data } = await axios.get<CommentsResponse>(
    `https://dummyjson.com/comments`,
  );

  return data.comments;
}
