import { makeAutoObservable, runInAction } from "mobx";
import { getComments, type Comment } from "../services/getComments";

class CommentStore {
  comments: Comment[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchComments = async () => {
    this.isLoading = true;

    try {
      const data = await getComments();

      runInAction(() => {
        this.comments = data;
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

export const commentStore = new CommentStore();
