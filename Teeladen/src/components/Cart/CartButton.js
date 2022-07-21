import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import {useState, useEffect} from 'react';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState();

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const items = useSelector((state) => state.cart.items);

  // Modal open/close
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  // empty string '' for no extra css class
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    }

  }, [items]);

  return (
    <button className={btnClasses} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;