import classes from "../quotes/HighlightedQuote.module.css";

const HighlightedPoem = (props) => {
  return (
    <figure className={classes.quote}>
      <pre>{props.text}</pre>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedPoem;
