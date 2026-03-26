import { injectable } from "inversify";
import {
  makeAutoObservable,
  runInAction,
  observable,
  autorun,
  reaction,
  computed,
} from "mobx";
import type { Post } from "../types/post";
import { getPosts } from "../services/getPosts";

@injectable()
export class PostStore {
  postsMap = observable.map<number, Post>();
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      allPosts: computed.struct,
    });

    autorun(() => {
      console.log(`[PostStore] Loading status changed: ${this.isLoading}`);
    });

    reaction(
      () => this.postsMap.size,
      (size) => {
        if (size > 0) {
          console.log(`[PostStore] Successfully loaded ${size} posts.`);
        }
      },
    );
  }

  get allPosts(): Post[] {
    return Array.from(this.postsMap.values());
  }

  fetchPosts = async () => {
    this.isLoading = true;
    try {
      const data = await getPosts();
      runInAction(() => {
        this.postsMap.clear();
        data.forEach((post) => {
          this.postsMap.set(post.id, post);
        });
      });
    } catch (error) {
      console.error("Fetch posts failed:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
