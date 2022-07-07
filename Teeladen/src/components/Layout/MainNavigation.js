import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import CartButton from "../Cart/CartButton";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Cart from "../Cart/Cart";
import { Fragment } from "react";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <Fragment>
      {showCart && <Cart onClose={toggleCartHandler} />}
      <header className={classes.header}>
        <div className={classes.logo}>Teeladen</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/products" activeClassName={classes.active}>
                Das ganze Sortiment
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-product" activeClassName={classes.active}>
                Tee hinzufügen
              </NavLink>
            </li>
            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
