import { useState } from "react";
import { Prompt } from "react-router-dom";
import useInput from "../../hooks/use-input";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ProductForm.module.css";

const ProductForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredNameIsValid && enteredDescriptionIsValid && enteredPriceIsValid) {
    formIsValid = true;
  }

  function submitFormHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onAddProduct({
      name: enteredName,
      description: enteredDescription,
      price: enteredPrice,
    });

    resetNameInput();
    resetDescriptionInput();
    resetPriceInput();
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const nameInputClasses = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;
  const descriptionInputClasses = `${classes.control} ${
    !descriptionInputHasError ? "" : classes.invalid
  }`;
  const priceInputClasses = `${classes.control} ${
    !priceInputHasError ? "" : classes.invalid
  }`;

  const leave = (
    <Prompt
      when={isEntering}
      message={(location) =>
        "Magst du die Seite wirklich verlassen? Alle deine eingegebenen Daten gehen verloren."
      }
    />
  );

  const load = props.isLoading && (
    <div className={classes.loading}>
      <LoadingSpinner />
    </div>
  );

  const nameLabel = (
    <div className={nameInputClasses}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="author"
        value={enteredName}
        placeholder="Name des Artikels"
        onChange={nameChangedHandler}
        onBlur={nameBlurHandler}
      />
      {nameInputHasError && (
        <p className={classes.errortext}>Bitte Namen eintragen!</p>
      )}
    </div>
  );

  const descriptionLabel = (
    <div className={descriptionInputClasses}>
      <label htmlFor="description">Beschreibung</label>
      <textarea
        id="description"
        rows="5"
        value={enteredDescription}
        placeholder="Beschreibung des Inhalts"
        onChange={descriptionChangedHandler}
        onBlur={descriptionBlurHandler}
      />
      {descriptionInputHasError && (
        <p className={classes.errortext}>Bitte beschreiben!</p>
      )}
    </div>
  );

  const priceLabel = (
    <div className={priceInputClasses}>
      <label htmlFor="price">Preis</label>
      <input
        type="number"
        id="price"
        min="0.00"
        max="100.00"
        step="0.01"
        value={enteredPrice}
        placeholder="Preis in Euro"
        onChange={priceChangedHandler}
        onBlur={priceBlurHandler}
      />
      {priceInputHasError && (
        <p className={classes.errortext}>Bitte Preis angeben!</p>
      )}
    </div>
  );

  const submitButton = (
    <div className={classes.actions}>
      <button
        onClick={finishEnteringHandler}
        disabled={!formIsValid}
        className={classes.button}
      >
        Hinzufügen!
      </button>
    </div>
  );

  return (
    <Card>
      {leave}
      <form
        onFocus={formFocusedHandler}
        className={classes.form}
        onSubmit={submitFormHandler}
      >
        {load}
        {nameLabel}
        {descriptionLabel}
        {priceLabel}
        {submitButton}
      </form>
    </Card>
  );
};

export default ProductForm;
