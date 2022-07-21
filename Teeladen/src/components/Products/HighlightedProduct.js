import classes from "./HighlightedProduct.module.css";
import Card from "../UI/Card";


const HighlightedProduct = (props) => {
  return (
    <div className={classes.item}>
      <Card>
        <header>
          <h3>{props.name}</h3>
          <div className={classes.price}>{(props.price * 1).toFixed(2)} €</div>
        </header>
        <p>{props.description}</p>
      </Card>
    </div>
  );
};

export default HighlightedProduct;
