export const Article = ({ articleObject }) => {
  const date = new Date(articleObject.created_at);
  const formattedDate = date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "GMT",
  });
  const articleLink = `/articles/${articleObject.article_id}`;
  return (
    <div className="article-instance">
      <a href={articleLink}>
        <img
          src={articleObject.article_img_url}
          alt={`Image of ${articleObject.title}`}
        />
        <p className="article-title">{articleObject.title}</p>
        <hr></hr>
        <div className="other-info">
          <p>Author : {articleObject.author}</p>
          <p>Topic : {articleObject.topic}</p>
          <p>Created : {formattedDate}</p>
          <p>comments : {articleObject.comment_count}</p>
          <p>votes : {articleObject.votes}</p>
        </div>
      </a>
    </div>
  );
};
