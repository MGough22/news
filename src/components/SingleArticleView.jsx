import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatCreatedAtDate } from "../utils/formatDate";
import { Comment } from "./Comment";
export const SingleArticleView = () => {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setIsLoading(true);
        const articleResponse = await fetch(
          `https://res-borealis.onrender.com/api/articles/${article_id}`
        );
        const commentResponse = await fetch(
          `https://res-borealis.onrender.com/api/articles/${article_id}/comments`
        );
        if (!articleResponse.ok || !commentResponse.ok) {
          throw new Error(
            `Failed to fetch data, error type: ${
              articleResponse.status || commentResponse.status
            }`
          );
        }
        const { article } = await articleResponse.json();
        const { comments } = await commentResponse.json();
        setArticle(article);
        setComments(comments);
      } catch (error) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticleData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!isLoading) {
    // console.log(comments[0]);
    return (
      <div className="article-and-comments">
        <div className="single-article-view">
          <div id="article-description">
            <h1>{article.title}</h1>
            <p>
              By: {article.author} | Topic: {article.topic} | created:{" "}
              {formatCreatedAtDate(article.created_at)}
            </p>
            <hr></hr>
          </div>
          <div className="article-body">
            <p>{article.body}</p>
          </div>
          <div className="article-footer">
            <p>
              Votes {article.votes} | comments {article.comment_count}
            </p>
          </div>
          <hr></hr>
        </div>
        <h2>Comments</h2>
        <div className="comments-view">
          {comments.map(el => {
            return <Comment commentObject={el} key={el.comment_id} />;
          })}
        </div>
      </div>
    );
  }
};

// "exampleResponse": {
//     "article_id": 11,
//     "title": "Am I a cat?",
//     "topic": "mitch",
//     "author": "icellusedkars",
//     "body": "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
//     "created_at": "2020-01-15T22:21:00.000Z",
//     "votes": 0,
//     "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//     "comment_count": 0
//   }
