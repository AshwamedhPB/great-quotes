import { useRef, useState, Fragment } from "react";
import { Prompt } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "../quotes/QuoteForm.module.css";

const PoemForm = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const author = useSelector((state) => state.username);
  const [isEntering, setIsEntering] = useState(false);
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredText = textInputRef.current.value;

    // optional: Could validate here
    props.onAddPoem({ author, text: enteredText });
  }

  function formFocusHandler() {
    setIsEntering(true);
  }

  function finishEntering() {
    setIsEntering(false);
  }

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All the data will be lost!"
        }
      />
      <Card>
        {isLoggedIn && (
          <form
            onFocus={formFocusHandler}
            className={classes.form}
            onSubmit={submitFormHandler}
          >
            {props.isLoading && (
              <div className={classes.loading}>
                <LoadingSpinner />
              </div>
            )}

            <div className={classes.control}>
              <label htmlFor="author">Author</label>
              <input type="text" id="author" value={author} disabled />
            </div>
            <div className={classes.control}>
              <label htmlFor="text">Text</label>
              <textarea id="text" rows="5" ref={textInputRef}></textarea>
            </div>
            <div className={classes.actions}>
              <button onClick={finishEntering} className="btn">
                Add Poem
              </button>
            </div>
          </form>
        )}
        {!isLoggedIn && <p>You must login/register to add poems.</p>}
      </Card>
    </Fragment>
  );
};

export default PoemForm;
