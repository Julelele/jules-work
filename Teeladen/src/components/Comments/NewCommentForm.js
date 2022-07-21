import { useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";
import Card from "../UI/Card";
import useInput from "../../hooks/use-input";

const NewCommentForm = (props) => {
  const {
    value: enteredText,
    isValid: enteredTextIsValid,
    hasError: textInputHasError,
    valueChangeHandler: textChangedHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetTextInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAuthor,
    isValid: enteredAuthorIsValid,
    hasError: authorInputHasError,
    valueChangeHandler: authorChangedHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthorInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredTextIsValid && enteredAuthorIsValid) {
    formIsValid = true;
  }

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment, onClosingForm } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({
      commentData: { text: enteredText, author: enteredAuthor },
      productId: props.productId,
    });

    resetTextInput();
    resetAuthorInput();
  };

  const textInputClasses = `${classes.control} ${
    !textInputHasError ? "" : classes.invalid
  }`;
  const authorInputClasses = `${classes.control} ${
    !authorInputHasError ? "" : classes.invalid
  }`;

  const load = status === "pending" && (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  const textLabel = (
    <div className={textInputClasses}>
      <label htmlFor="comment">Deine Nachricht an uns</label>
      <textarea
        id="comment"
        rows="5"
        value={enteredText}
        placeholder="Schreib was Nettes"
        onChange={textChangedHandler}
        onBlur={textBlurHandler}
      />
      {textInputHasError && (
        <p className={classes.errortext}>Kommentar vergessen!</p>
      )}
    </div>
  );

  const authorLabel = (
    <div className={authorInputClasses}>
      <label htmlFor="author">Wer bist du?</label>
      <input
        id="author"
        value={enteredAuthor}
        placeholder="Anonym oder Name"
        onChange={authorChangedHandler}
        onBlur={authorBlurHandler}
      />
      {authorInputHasError && <p className={classes.errortext}>Wer bist du?</p>}
    </div>
  );

  const submitButton = (
    <span className={classes.actions}>
      <button disabled={!formIsValid}>Abschicken</button>
    </span>
  );

  const closeButton = (
    <span className={classes.actions}>
      <button onClick={onClosingForm}>Schließen</button>
    </span>
  );

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {load}
        {textLabel}
        {authorLabel}
        <div className={classes.btnGroup}>
          {closeButton}
          {submitButton}
        </div>
      </form>
    </Card>
  );
};

export default NewCommentForm;
