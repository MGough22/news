import { formatCreatedAtDate } from "../utils/formatDate";
export const Comment = ({ commentObject }) => {
  return (
    <div className="comment-instance">
      <p className="comment-info">
        {commentObject.author} | at{" "}
        {formatCreatedAtDate(commentObject.created_at)}
      </p>
      <hr></hr>
      <p className="comment-body">{commentObject.body}</p>
      <p className="comment-info">votes : {commentObject.votes}</p>
    </div>
  );
};
