import { Link } from "react-router";
import { formatCreatedAtDate } from "../utils/formatDate";
export const Article = ({ articleObject }) => {
  const articleLink = `/articles/${articleObject.article_id}`;
  return (
    <div className="article-instance">
      <Link to={articleLink}>
        <img
          src={articleObject.article_img_url}
          alt={`Image of ${articleObject.title}`}
        />
        <p className="article-title">{articleObject.title}</p>
        <hr></hr>
        <div className="other-info">
          <p>Author : {articleObject.author}</p>
          <p>Topic : {articleObject.topic}</p>
          <p>Created : {formatCreatedAtDate(articleObject.created_at)}</p>
          <p>comments : {articleObject.comment_count}</p>
          <p>votes : {articleObject.votes}</p>
        </div>
      </Link>
    </div>
  );
};
