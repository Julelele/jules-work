import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import Card from "../UI/Card";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { productId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(productId);
  }, [productId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    sendRequest(productId);
  }, [sendRequest, productId]);

  const closingFormHandler = () => {
    setIsAddingComment(false);
  }

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className={classes.noComments}>Noch keine Kommentare!</p>;
  }

  return (
    <Card>
      <section className={classes.comments}>
        <h2>Kommentare</h2>
        {!isAddingComment && (
          <button className="button" onClick={startAddCommentHandler}>
            Kommentar schreiben!
          </button>
        )}
        {isAddingComment && (
          <NewCommentForm 
            productId={productId}
            onAddedComment={addedCommentHandler}
            onClosingForm={closingFormHandler}
          />
        )}
        {comments}
      </section>
    </Card>
  );
};

export default Comments;
