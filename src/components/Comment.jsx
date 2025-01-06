import { useEffect, useState } from "react";
import { formatCreatedAtDate } from "../utils/formatDate";
import { hatch } from "ldrs";
import { getUserData } from "../api";

hatch.register();
export const Comment = ({ commentObject }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getUserData(commentObject.author);
      setUserData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

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
      <p className="comment-info">{commentObject.votes} votes</p>
    </div>
  );
};
