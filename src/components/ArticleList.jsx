import { useEffect, useState } from "react";
import { Article } from "./Article";
import { hatch } from "ldrs";
import { getArticles } from "../api";

hatch.register();

export const ArticleList = () => {
  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await getArticles();
      setArticles(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="article-collection">
      {articles.articles.map(el => {
        return <Article articleObject={el} key={el.article_id} />;
      })}
    </div>
  );
};
