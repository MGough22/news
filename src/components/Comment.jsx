import { useEffect, useState } from "react";
import { formatCreatedAtDate } from "../utils/formatDate";
import { hatch } from "ldrs";

hatch.register();
export const Comment = ({ commentObject }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(commentObject.author);
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://res-borealis.onrender.com/api/users/${commentObject.author}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user image, error type: ${response.status}`
          );
        }
        const responseData = await response.json();
        setUserData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
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
      <div className="comment-instance">
        <img
          className="user-avatar"
          src={userData.user.avatar_url}
          alt={`Avatar of ${userData.user.username}`}
        />
        <p className="comment-info">{commentObject.author}</p>
        <p className="comment-info">
          {formatCreatedAtDate(commentObject.created_at)}
        </p>
        <hr></hr>
        <p className="comment-body">{commentObject.body}</p>
        <p className="comment-info">votes : {commentObject.votes}</p>
      </div>
    );
  }
};
