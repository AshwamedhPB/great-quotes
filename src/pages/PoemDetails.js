import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { getSinglePoem } from "../lib/api2";
import { useSelector } from "react-redux";
import Comments from "../components/comments/Comments";
import HighlightedPoem from "../components/Poems/HighlightedPoem";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const PoemDetails = () => {
  const params = useParams();
  const { poemId } = params;
  const {
    sendRequest,
    status,
    data: loadedPoem,
    error,
  } = useHttp(getSinglePoem, true);

  useEffect(() => {
    sendRequest(poemId);
  }, [sendRequest, poemId]);

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
  if (!loadedPoem.text) {
    return <p>No Poem Found!</p>;
  }

  return (
    <div>
      <HighlightedPoem author={loadedPoem.author} text={loadedPoem.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default PoemDetails;
