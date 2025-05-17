import classes from "../quotes/NoQuotesFound.module.css";
import { Link } from "react-router-dom";

const NoPoemsFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No poems found!</p>
      <Link className="btn" to="/new-poem">
        Add a Poem
      </Link>
    </div>
  );
};

export default NoPoemsFound;
