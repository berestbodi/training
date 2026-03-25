import { makeAutoObservable, runInAction } from "mobx";
import type { Post } from "../types/post";
import { getProducts } from "../services/getPosts";

class PostStore {
  posts: Post[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchPosts = async () => {
    this.isLoading = true;

    try {
      const data = await getProducts();
      runInAction(() => {
        this.posts = data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const postStore = new PostStore();
