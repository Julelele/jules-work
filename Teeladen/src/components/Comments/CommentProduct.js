import classes from "./CommentProduct.module.css";
import Card from "../UI/Card";

const CommentProduct = (props) => {
  return (
    <Card>
      <div className={classes.product}>
        <p>{props.text} - <span>{props.author}</span></p>
      </div>
    </Card>
  );
};

export default CommentProduct;
