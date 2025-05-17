import { Link } from "react-router-dom";
import classes from "../quotes/QuoteItem.module.css";

const PoemItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/poems/${props.id}`} className="btn">
        Expand
      </Link>
    </li>
  );
};

export default PoemItem;
