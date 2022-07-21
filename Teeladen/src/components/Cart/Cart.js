import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";


const Cart = (props) => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const hasItems = cartItems.length > 0;
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const newTotalAmount = `${(totalAmount * 1).toFixed(2)} €`;

  //in Cart sendCartData and fetchCartData aus App.js
  //in try-catch Block?
  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://react-teeladen-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedProducts: cartItems,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);

    dispatch(cartActions.replaceCart({ items: [], totalQuantity: 0, totalAmount: 0}));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const formClosingHandler = () => {
    setIsCheckout(false);
  };

  const Items = (
    <ul className={classes.cartItems}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            total: item.totalPrice,
            price: item.price,
          }}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Schließen
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Bestellen
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <div>
      {Items}
      <div className={classes.total}>
        <span>Insgesamt: </span>
        <span>{newTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onClosingForm={formClosingHandler}
        />
      )}
      {!isCheckout && modalActions}
    </div>
  );

  const isSubmittingModalContent = <p>Bestellung wird versendet...</p>;

  const didSubmitModalContent = (
    <div className={classes.actions}>
      <p>Bestellung wurde abgeschickt. Danke!</p>
      <button className={classes.button} onClick={props.onClose}>
        Schließen
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <section className={classes.cart}>
        <h2>Deine Einkaufstasche</h2>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </section>
    </Modal>
  );
};

export default Cart;
