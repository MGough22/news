import { useEffect, useState } from "react";
import { hatch } from "ldrs";
import { AuthorCard } from "./AuthorCard";

hatch.register();

export const AuthorsView = () => {
  const [authors, setAuthors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://res-borealis.onrender.com/api/users`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data, error type: ${response.status}`
          );
        }
        const userObjects = await response.json();
        setAuthors(userObjects);
      } catch (error) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!isLoading) {
    return (
      <div className="authors-view">
        {authors.users.map(el => {
          return <AuthorCard authorObject={el} key={el.username} />;
        })}
      </div>
    );
  }
};
