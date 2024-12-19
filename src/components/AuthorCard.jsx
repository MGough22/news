export const AuthorCard = ({ authorObject }) => {
  return (
    <>
      <div className="author-instance">
        <img
          className="user-avatar"
          src={authorObject.avatar_url}
          alt={`Avatar of ${authorObject.username}`}
        />
        <h1>{authorObject.username}</h1>
      </div>
    </>
  );
};
