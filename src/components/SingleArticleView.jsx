import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatCreatedAtDate } from "../utils/formatDate";
import { Comment } from "./Comment";
import { hatch } from "ldrs";
import { getArticleComments, getArticleData } from "../api";

hatch.register();

export const SingleArticleView = () => {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const [commentVisbility, setCommentVisibility] = useState(true);

  const handleCommentVisibility = e => {
    e.preventDefault();
    setCommentVisibility(!commentVisbility);
  };

  const fetchArticleData = async () => {
    try {
      setIsLoading(true);
      const articleResponse = await getArticleData(article_id);
      const commentResponse = await getArticleComments(article_id);
      const { article } = articleResponse.data;
      const { comments } = commentResponse.data;
      setArticle(article);
      setComments(comments);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const commentSectionTitle = (commentVisbility, numberOfComments) => {
    return commentVisbility
      ? `Hide ${numberOfComments} comments -`
      : `Show ${numberOfComments} comments +`;
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
            <p>Votes {article.votes}</p>
            <button className="upvote" type="submit">
              ▲ Upvote
            </button>
            <button className="downvote" type="submit">
              ▼ Downvote
            </button>
          </div>
          <hr></hr>
        </div>
        <button type="submit" onClick={handleCommentVisibility}>
          <h2>
            {commentSectionTitle(commentVisbility, article.comment_count)}
          </h2>
        </button>
        {commentSection(commentVisbility)}
      </div>
    );
  }
};
