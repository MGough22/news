import { Link } from "react-router";
export const Header = () => {
  return (
    <>
      <Link to="/">
        <h1 className="main-title">RES BOREALIS</h1>
      </Link>
      <nav>
        <ul className="links-list">
          <li>
            <Link to="/">Articles</Link>
          </li>
          <li>
            <a href="#">Authors</a>
          </li>
          <li>
            <a href="#">Topics</a>
          </li>
        </ul>
      </nav>
      <hr></hr>
    </>
  );
};
