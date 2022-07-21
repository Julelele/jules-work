import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";

const CartItem = (props) => {
  const dispatch = useDispatch();

  // children of Cart.js
  const { name, quantity, total, price, id } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        price,
      })
    );
  };

  const item = (
    <header>
      <h3>
        <span className={classes.quantity}>{quantity}</span> x {name}
      </h3>
      <div className={classes.price}>
        {(total * 1).toFixed(2)}€ {""}
        <span className={classes.itemprice}>
          {(price * 1).toFixed(2)}€ Stk.
        </span>
      </div>
    </header>
  );

  const buttons = (
    <div className={classes.details}>
      <button className={classes.plusMinusButton} onClick={removeItemHandler}>
        -
      </button>
      <button className={classes.plusMinusButton} onClick={addItemHandler}>
        +
      </button>
    </div>
  );

  return (
    <li className={classes.item}>
      <Card>
        {item}
        {buttons}
      </Card>
    </li>
  );
};

export default CartItem;
