import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context-store/auth-context";
import classes from "./ProfileForm.module.css";
import Card from "../UI/Card";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation maybe

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvngBQwbFQO_-sWfY1mas9INhVSJMG2nQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">Neues Passwort?</label>
          <input
            type="password"
            id="new-password"
            minLength="7"
            placeholder="Neues Passwort (min. 7 Zeichen)"
            ref={newPasswordInputRef}
          />
        </div>
        <div className={classes.action}>
          <button>Passwort ändern</button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
