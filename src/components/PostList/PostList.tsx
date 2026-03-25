import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { postStore } from "../../store/postStore";
import css from "./PostList.module.css";

const PostList = observer(() => {
  const { posts, isLoading, fetchPosts } = postStore;

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts.length]);

  if (isLoading)
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Loading posts...
      </div>
    );

  return (
    <div className={css.container}>
      {posts.map((post) => (
        <article key={post.id} className={css.postCard}>
          <h2 className={css.title}>{post.title}</h2>

          <div style={{ marginBottom: "15px" }}>
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
            <span style={{ opacity: 0.5 }}>User ID: {post.userId}</span>
          </div>
        </article>
      ))}
    </div>
  );
});

export default PostList;
