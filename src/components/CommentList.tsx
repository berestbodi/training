import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { commentStore } from "../store/commentStore";

const CommentList = observer(() => {
  useEffect(() => {
    commentStore.fetchComments();
  }, []);

  if (commentStore.isLoading) return <div>Завантаження...</div>;

  return (
    <div>
      <ul style={{ textDecoration: "none", listStyle: "none" }}>
        {commentStore.comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user.fullName}:</strong> {comment.body}
            (👍 {comment.likes})
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CommentList;
