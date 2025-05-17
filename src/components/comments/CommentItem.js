import classes from "./CommentItem.module.css";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const CommentItem = (props) => {
  const username = useSelector((state) => state.username);
  const match = useRouteMatch();
  const deleteCommentHandler = (event) => {
    const commentid = event.target.lastChild.innerText;
    const quoteId = match.params.quoteId;
    fetch(
      `https://kick-development-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${quoteId}/${commentid}.json`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <li className={classes.item}>
      <div>
        <p style={{ textAlign: "left" }}>
          {props.text}
          {username === "Kick" && (
            <span onClick={deleteCommentHandler} className={classes.share}>
              X<template>{props.id}</template>
            </span>
          )}
        </p>
      </div>
      <span style={{ fontStyle: "italic", fontSize: "80%" }}>
        {`-${props.name}`}
      </span>
    </li>
  );
};

export default CommentItem;
