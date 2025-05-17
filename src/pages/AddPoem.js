import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PoemForm from "../components/Poems/PoemFrom";
import useHttp from "../hooks/use-http";
import { addPoem } from "../lib/api2";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

const AddPoem = (props) => {
  const { sendRequest, status } = useHttp(addPoem);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("./poems");
    }
  }, [status, history]);

  const AddPoemHandler = (poemData) => {
    sendRequest(poemData);
  };
  return (
    <PoemForm isLoading={status === "pending"} onAddPoem={AddPoemHandler} />
  );
};

export default AddPoem;
