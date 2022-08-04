import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useContext } from "react";
import classes from "./MainNavigation.module.css";

import CartButton from "../Cart/CartButton";
import Cart from "../Cart/Cart";
import { uiActions } from "../../store/ui-slice";
import AuthContext from "../../context-store/auth-context";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      {showCart && <Cart onClose={toggleCartHandler} />}
      <header className={classes.header}>
        <NavLink className={classes.logo} to="/">
          Teeladen
        </NavLink>

        <nav className={classes.nav}>
          <ul>
            {!isLoggedIn && (
              <li>
                <NavLink to="/auth">Login</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/products" activeClassName={classes.active}>
                  Das ganze Sortiment
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/new-product" activeClassName={classes.active}>
                  Tee hinzufügen
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/profile">Profil</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <CartButton />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
