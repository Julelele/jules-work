import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedProduct from "../components/Products/HighlightedProduct";
import Comments from "../components/Comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleProduct } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const ProductDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { productId } = params;

  const {
    sendRequest,
    status,
    data: loadedProduct,
    error,
  } = useHttp(getSingleProduct, true);

  useEffect(() => {
    sendRequest(productId);
  }, [sendRequest, productId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  //besserer Check mit name
  if (!loadedProduct.name) {
    return <p>Kein Eintrag</p>;
  }
  
  return (
    <Fragment>
      <HighlightedProduct
        description={loadedProduct.description}
        name={loadedProduct.name}
        price={loadedProduct.price}
      />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="button" to={`${match.url}/comments`}>
            Kommentare anzeigen!
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default ProductDetail;
