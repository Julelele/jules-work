import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput((value) => value.trim().length === 5);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetNameInput();
    resetEmailInput();
    resetStreetInput();
    resetCityInput();
    resetPostalCodeInput();
  };

  const nameInputClasses = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;
  const emailInputClasses = `${classes.control} ${
    !emailInputHasError ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    !streetInputHasError ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    !cityInputHasError ? "" : classes.invalid
  }`;
  const postalCodeInputClasses = `${classes.control} ${
    !postalCodeInputHasError ? "" : classes.invalid
  }`;

  const nameLabel = (
    <div className={nameInputClasses}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={nameChangedHandler}
        onBlur={nameBlurHandler}
        value={enteredName}
      />
      {nameInputHasError && (
        <p className={classes.errortext}>Bitte Namen eintragen!</p>
      )}
    </div>
  );

  const mailLabel = (
    <div className={emailInputClasses}>
      <label htmlFor="email">E-Mail</label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
      />
      {emailInputHasError && (
        <p className={classes.errortext}>Bitte gültige E-Mail eintragen!</p>
      )}
    </div>
  );

  const streetLabel = (
    <div className={streetInputClasses}>
      <label htmlFor="name">Straße</label>
      <input
        type="text"
        id="street"
        onChange={streetChangedHandler}
        onBlur={streetBlurHandler}
        value={enteredStreet}
      />
      {streetInputHasError && (
        <p className={classes.errortext}>Bitte Straße eintragen!</p>
      )}
    </div>
  );

  const cityLabel = (
    <div className={cityInputClasses}>
      <label htmlFor="name">Stadt</label>
      <input
        type="text"
        id="city"
        onChange={cityChangedHandler}
        onBlur={cityBlurHandler}
        value={enteredCity}
      />
      {cityInputHasError && (
        <p className={classes.errortext}>Bitte Stadt eintragen!</p>
      )}
    </div>
  );

  const postelCodeLabel = (
    <div className={postalCodeInputClasses}>
      <label htmlFor="name">Postleitzahl</label>
      <input
        type="number"
        id="postalCode"
        onChange={postalCodeChangedHandler}
        onBlur={postalCodeBlurHandler}
        value={enteredPostalCode}
      />
      {postalCodeInputHasError && (
        <p className={classes.errortext}>Bitte Postleitzahl eintragen!</p>
      )}
    </div>
  );

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        {nameLabel}
        {mailLabel}
        {streetLabel}
        {cityLabel}
        {postelCodeLabel}
        <button className={classes.button} onClick={props.onClosingForm}>
          Schließen
        </button>
        <button
          type="submit"
          className={classes.button}
          disabled={!formIsValid}
        >
          Bestellen
        </button>
      </form>
    </section>
  );
};

export default Checkout;
