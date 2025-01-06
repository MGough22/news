import { useEffect, useState } from "react";
import { hatch } from "ldrs";
import { AuthorCard } from "./AuthorCard";
import { getUsers } from "../api";

hatch.register();

export const AuthorsView = () => {
  const [authors, setAuthors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      setAuthors(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="authors-view">
      {authors.users.map(el => {
        return <AuthorCard authorObject={el} key={el.username} />;
      })}
    </div>
  );
};
