import CommentProduct from "./CommentProduct";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentProduct
          key={comment.id}
          text={comment.text}
          author={comment.author}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
