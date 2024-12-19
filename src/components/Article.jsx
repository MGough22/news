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
          <p>
            By {articleObject.author} | In {articleObject.topic}
          </p>
          <p>{formatCreatedAtDate(articleObject.created_at)}</p>
        </div>
      </Link>
    </div>
  );
};
