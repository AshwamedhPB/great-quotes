import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.username);
  const match = useRouteMatch();
  const shareHandler = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    const shareData = {
      title: "Kick-Developement Quotes",
      text: "Great Quotes: Check mine and write your won!",
      url,
    };
    navigator.share(shareData);
  };

  return (
    <figure className={classes.quote}>
      <p>{`❤ ${props.likes}`}</p>
      <p className="styledFont">{props.text}</p>
      <figcaption>{`- ${props.author}`}</figcaption>
      <p className={classes.share} onClick={props.AddLikeHandler}>
        Like
      </p>
      <p className={classes.share} onClick={props.commentsHandler}>
        {isLoggedIn && (
          <Link className={classes.comments} to={`${match.url}/comments`}>
            Comment
          </Link>
        )}
        {!isLoggedIn && (
          <Link className={classes.comments} to={`/login`}>
            Comment
          </Link>
        )}
      </p>
      <p className={classes.share} onClick={shareHandler}>
        Share
      </p>
      {username === "Kick" && (
        <p className={classes.share} onClick={props.deleteHandler}>
          Delete
        </p>
      )}
    </figure>
  );
};

export default HighlightedQuote;
