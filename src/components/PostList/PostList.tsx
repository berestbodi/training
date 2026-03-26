import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useService } from "../../inversify.config";
import css from "./PostList.module.css";
import { TYPES } from "../../types/types";
import type { PostStore } from "../../store/postStore";

const PostList = observer(() => {
  const postStore = useService<PostStore>(TYPES.PostStore);
  const { allPosts, isLoading, fetchPosts } = postStore;

  useEffect(() => {
    if (allPosts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, allPosts.length]);

  if (isLoading) {
    return <div className={css.loadingContainer}>Loading posts...</div>;
  }

  return (
    <div className={css.container}>
      {allPosts.map((post) => (
        <article key={post.id} className={css.postCard}>
          <h2 className={css.title}>{post.title}</h2>

          <div className={css.tagsWrapper}>
            {post.tags.map((tag) => (
              <span key={tag} className={css.tag}>
                #{tag}
              </span>
            ))}
          </div>

          <p className={css.body}>{post.body}</p>

          <div className={css.footer}>
            <div className={css.stats}>
              <span>👁 {post.views} views</span>
              <span>👍 {post.reactions.likes}</span>
              <span>👎 {post.reactions.dislikes}</span>
            </div>
            <span className={css.userId}>User ID: {post.userId}</span>
          </div>
        </article>
      ))}
    </div>
  );
});

export default PostList;
