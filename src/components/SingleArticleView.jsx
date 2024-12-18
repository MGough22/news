import { useEffect, useState } from "react";
import { useParams } from "react-router";
export const SingleArticleView = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://res-borealis.onrender.com/api/articles/${article_id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data, error type: ${response.status}`
          );
        }
        const articleObject = await response.json();
        setArticle(articleObject);
      } catch (error) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!isLoading) {
    return (
      <div className="single-article-view">
        <p>{article.article.body}</p>
      </div>
    );
  }
};
