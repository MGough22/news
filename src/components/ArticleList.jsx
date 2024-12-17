import { useEffect, useState } from "react";
import { Article } from "./Article";

export const ArticleList = () => {
  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://res-borealis.onrender.com/api/articles`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data, error type: ${response.status}`
          );
        }
        const arrayOfarticleObjects = await response.json();
        setArticles(arrayOfarticleObjects);
      } catch (error) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!isLoading) {
    return (
      <div className="article-collection">
        {articles.articles.map(el => {
          return <Article articleObject={el} key={el.article_id} />;
        })}
      </div>
    );
  }
};
