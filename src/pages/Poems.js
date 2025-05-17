import useHttp from "../hooks/use-http";
import { getAllPoems } from "../lib/api2";
import { useEffect } from "react";
import PoemList from "../components/Poems/PoemList";
import NoPoemsFound from "../components/Poems/NoPoemsFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

const Poems = () => {
  const username = useSelector((state) => state.username);
  const {
    sendRequest,
    status,
    data: loadedPoems,
    error,
  } = useHttp(getAllPoems, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (!["Kick", "akanksha_29"].includes(username)) {
    return <NotFound />;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadedPoems || loadedPoems.length === 0)) {
    return <NoPoemsFound />;
  }
  return <PoemList poems={loadedPoems} />;
};

export default Poems;
