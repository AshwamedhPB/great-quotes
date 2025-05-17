import { useEffect, useState } from "react";
import { useParams, Route, useRouteMatch, useHistory } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const { quoteId } = params;
  const history = useHistory();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikeCount] = useState(null);

  const showCommentsHandler = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const match = useRouteMatch();

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found!</p>;
  }

  const AddLikeHandler = () => {
    setLikeCount(loadedQuote.likes + 1);
    fetch(
      `https://kick-development-default-rtdb.asia-southeast1.firebasedatabase.app/quotes/${loadedQuote.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: loadedQuote.id,
          author: loadedQuote.author,
          text: loadedQuote.text,
          likes: loadedQuote.likes + 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const deleteQuoteHandler = () => {
    fetch(
      `https://kick-development-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${loadedQuote.id}.json`,
      {
        method: "DELETE",
      }
    ).catch((err) => console.log(err.message));
    fetch(
      `https://kick-development-default-rtdb.asia-southeast1.firebasedatabase.app/quotes/${loadedQuote.id}.json`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        history.replace("/quotes");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <HighlightedQuote
        author={loadedQuote.author}
        text={loadedQuote.text}
        likes={likesCount ? likesCount : loadedQuote.likes}
        commentsHandler={showCommentsHandler}
        AddLikeHandler={AddLikeHandler}
        deleteHandler={deleteQuoteHandler}
      />
      {showComments && (
        <div>
          <Route path={`${match.path}/comments`}>
            <Comments />
          </Route>
        </div>
      )}
    </div>
  );
};

export default QuoteDetails;
