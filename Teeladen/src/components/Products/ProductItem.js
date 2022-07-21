import classes from "./ProductItem.module.css";
import Card from "../UI/Card";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, description } = props;

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        price,
        description,
      })
    );
  };

  const item = (
    <header>
      <h3>{name}</h3>
      <div className={classes.price}>{(price * 1).toFixed(2)} €</div>
    </header>
  );
  
  const buttons = (
    <div>
      <button className={classes.button} onClick={addToCartHandler}>
        Hinzufügen
      </button>
      <Link className={classes.button} to={`/products/${props.id}`}>
        Mehr Infos
      </Link>
    </div>
  );

  return (
    <li className={classes.item}>
      <Card>
        {item}
        <p>{description}</p>
        {buttons}
      </Card>
    </li>
  );
};

export default ProductItem;
