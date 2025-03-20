import { useState } from "react";
import "./style.css";

const Comments = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  return (
    <div className="details-right">
      <div className="comment-section">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="დაწერე კომენტარი"
        />
        <button onClick={handleCommentSubmit}>დააკომენტარე</button>

        <ul className="comment-list">
          {comments.map((comment: string, index: number) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
