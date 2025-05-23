import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.text}
          name={comment.name}
          id={comment.id}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
