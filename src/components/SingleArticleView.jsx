import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatCreatedAtDate } from "../utils/formatDate";
import { Comment } from "./Comment";
import { hatch } from "ldrs";

hatch.register();

export const SingleArticleView = () => {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const [commentVisbility, setCommentvisibility] = useState(true);

  const handleCommentVisibility = e => {
    e.preventDefault();
    setCommentvisibility(!commentVisbility);
  };

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

  const commentSection = commentVisbility => {
    return commentVisbility ? (
      <div className="comments-view">
        {comments.map(el => {
          return <Comment commentObject={el} key={el.comment_id} />;
        })}
      </div>
    ) : null;
  };

  const commentSectionTitle = commentVisbility => {
    return commentVisbility ? "Hide comments" : "Show comments";
  };

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!isLoading) {
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
        <button type="submit" onClick={handleCommentVisibility}>
          <h2>{commentSectionTitle(commentVisbility)}</h2>
        </button>
        {commentSection(commentVisbility)}
      </div>
    );
  }
};
