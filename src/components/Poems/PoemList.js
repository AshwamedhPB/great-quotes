import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import PoemItem from "./PoemItem";
import classes from "../quotes/QuoteList.module.css";

const sortPoems = (poems, ascending) => {
  return poems.sort((poemA, poemB) => {
    if (ascending) {
      return poemA.id > poemB.id ? 1 : -1;
    } else {
      return poemA.id < poemB.id ? 1 : -1;
    }
  });
};

const PoemList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryData = new URLSearchParams(location.search);
  const sortAscending = queryData.get("sort") === "asc";
  const sortedPoems = sortPoems(props.poems, sortAscending);

  const sortClickHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${sortAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortClickHandler}>{`Sort ${
          sortAscending ? "Decending" : "Ascending"
        }`}</button>
      </div>
      <ul className={classes.list}>
        {sortedPoems.map((poem) => (
          <PoemItem
            key={poem.id}
            id={poem.id}
            author={poem.author}
            text={poem.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default PoemList;
